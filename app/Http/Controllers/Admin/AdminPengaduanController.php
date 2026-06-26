<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class AdminPengaduanController extends Controller
{
    /**
     * Display a list of all complaints.
     */
    public function index(Request $request)
    {
        $query = Pengaduan::with('mataKuliah');

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_pelapor', 'like', "%{$search}%")
                  ->orWhere('nim_pelapor', 'like', "%{$search}%")
                  ->orWhere('isi_pengaduan', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%" . str_replace('#T', '', $search) . "%");
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

        // Angkatan filter
        if ($request->filled('angkatan')) {
            $query->where('angkatan', $request->angkatan);
        }

        $pengaduans = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return inertia('Admin/Pengaduan/Index', [
            'pengaduans' => $pengaduans,
            'filters' => $request->only(['search', 'status', 'kategori', 'angkatan'])
        ]);
    }

    /**
     * Display details of a specific complaint.
     */
    public function show($id)
    {
        $pengaduan = Pengaduan::with(['mataKuliah', 'dibahasOleh'])->findOrFail($id);

        return inertia('Admin/Pengaduan/Show', [
            'pengaduan' => $pengaduan,
            'lampiranUrl' => $pengaduan->file_lampiran ? route('admin.pengaduan.lampiran', ['id' => $pengaduan->id]) : null,
        ]);
    }

    /**
     * Mark a complaint as discussed in the evaluation meeting.
     */
    public function tandaiDibahas(Request $request, $id)
    {
        $pengaduan = Pengaduan::findOrFail($id);

        $pengaduan->update([
            'status' => 'sudah_dibahas',
            'dibahas_at' => now(),
            'dibahas_oleh' => auth()->id(),
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Pengaduan berhasil ditandai sebagai sudah dibahas.'
            ]);
        }

        return back()->with('success', 'Pengaduan berhasil ditandai sebagai sudah dibahas.');
    }

    /**
     * Render the fullscreen presentation view.
     */
    public function presentasi(Request $request)
    {
        return inertia('Admin/Pengaduan/Presentasi', [
            'filters' => $request->only(['search', 'status', 'kategori', 'angkatan'])
        ]);
    }

    /**
     * Fetch all filtered data for presentation navigation.
     */
    public function presentasiData(Request $request)
    {
        $query = Pengaduan::with('mataKuliah');

        // Filter status: if not specified, default to 'baru'
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        } else {
            $query->where('status', 'baru');
        }

        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        if ($request->filled('angkatan')) {
            $query->where('angkatan', $request->angkatan);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_pelapor', 'like', "%{$search}%")
                  ->orWhere('nim_pelapor', 'like', "%{$search}%")
                  ->orWhere('isi_pengaduan', 'like', "%{$search}%")
                  ->orWhere('id', 'like', "%" . str_replace('#T', '', $search) . "%");
            });
        }

        $pengaduans = $query->orderBy('created_at', 'asc')->get();

        // Ensure custom accessors are appended
        $pengaduans->each(function ($p) {
            $p->append(['pelapor', 'kategori_label', 'nomor_tiket']);
        });

        return response()->json($pengaduans);
    }

    /**
     * Securely stream attachment inline.
     */
    public function downloadLampiran($id)
    {
        $pengaduan = Pengaduan::findOrFail($id);

        if (!$pengaduan->file_lampiran || !Storage::disk('local')->exists($pengaduan->file_lampiran)) {
            abort(404, 'File lampiran tidak ditemukan.');
        }

        return Storage::disk('local')->response($pengaduan->file_lampiran);
    }
}
