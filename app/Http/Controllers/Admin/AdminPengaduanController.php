<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use App\Mail\PengaduanResponded;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class AdminPengaduanController extends Controller
{
    /**
     * Display a list of all complaints.
     */
    public function index(Request $request)
    {
        $query = Pengaduan::query();

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('nim', 'like', "%{$search}%")
                  ->orWhere('judul', 'like', "%{$search}%")
                  ->orWhere('nomor_tiket', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Kategori filter
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        $pengaduans = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return inertia('Admin/Pengaduan/Index', [
            'pengaduans' => $pengaduans,
            'filters' => $request->only(['search', 'status', 'kategori'])
        ]);
    }

    /**
     * Display details of a specific complaint.
     * Automatically update status to 'Diproses' if status is currently 'Baru'.
     */
    public function show($id)
    {
        $pengaduan = Pengaduan::findOrFail($id);

        if ($pengaduan->status === 'Baru') {
            $pengaduan->update(['status' => 'Diproses']);
        }

        return inertia('Admin/Pengaduan/Show', [
            'pengaduan' => $pengaduan,
            'lampiranUrl' => $pengaduan->lampiran ? route('admin.pengaduan.lampiran', ['id' => $pengaduan->id]) : null,
        ]);
    }

    /**
     * Respond to a complaint and update status.
     */
    public function respond(Request $request, $id)
    {
        $pengaduan = Pengaduan::findOrFail($id);

        $request->validate([
            'respons' => 'required|string|max:2000',
            'status' => 'required|in:Diproses,Selesai',
        ]);

        $pengaduan->update([
            'respons' => $request->respons,
            'status' => $request->status,
        ]);

        // Send Email notification with response
        try {
            Mail::to($pengaduan->email)->send(new PengaduanResponded($pengaduan));
        } catch (\Exception $e) {
            Log::error('Failed to send PengaduanResponded email: ' . $e->getMessage());
        }

        return redirect()->route('admin.pengaduan.show', $pengaduan->id)
            ->with('success', 'Tanggapan berhasil disimpan dan email notifikasi telah dikirim.');
    }

    /**
     * Download lampiran securely (restricted to authenticated admin).
     */
    public function downloadLampiran($id)
    {
        $pengaduan = Pengaduan::findOrFail($id);

        if (!$pengaduan->lampiran || !Storage::disk('local')->exists($pengaduan->lampiran)) {
            abort(404, 'File lampiran tidak ditemukan.');
        }

        return Storage::disk('local')->download($pengaduan->lampiran);
    }
}
