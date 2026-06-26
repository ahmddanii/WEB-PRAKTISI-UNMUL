<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PengajuanSurat;
use App\Mail\SuratApproved;
use App\Mail\SuratRejected;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class AdminPengajuanSuratController extends Controller
{
    /**
     * Display a list of all submissions.
     */
    public function index(Request $request)
    {
        $query = PengajuanSurat::query();

        // Search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('nim', 'like', "%{$search}%")
                  ->orWhere('nomor_pengajuan', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Jenis Surat filter
        if ($request->filled('jenis_surat')) {
            $query->where('jenis_surat', $request->jenis_surat);
        }

        $surats = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return inertia('Admin/PengajuanSurat/Index', [
            'surats' => $surats,
            'filters' => $request->only(['search', 'status', 'jenis_surat'])
        ]);
    }

    /**
     * Display details of a specific submission.
     */
    public function show($id)
    {
        $surat = PengajuanSurat::findOrFail($id);

        return inertia('Admin/PengajuanSurat/Show', [
            'surat' => $surat,
            'buktiUrl' => $surat->file_bukti ? route('admin.surat.bukti', ['id' => $surat->id]) : null,
            'suratUrl' => $surat->file_surat ? route('admin.surat.file', ['id' => $surat->id]) : null,
        ]);
    }

    /**
     * Approve the submission and upload the physical PDF.
     */
    public function approve(Request $request, $id)
    {
        $surat = PengajuanSurat::findOrFail($id);

        if ($surat->status !== 'Menunggu') {
            return back()->with('error', 'Pengajuan ini sudah diproses sebelumnya.');
        }

        $request->validate([
            'file_surat' => 'required|file|mimes:pdf|max:4096',
            'catatan' => 'nullable|string|max:1000',
        ]);

        // Save PDF physically in secure disk local
        $path = $request->file('file_surat')->store('surat', 'local');

        $surat->update([
            'status' => 'Disetujui',
            'file_surat' => $path,
            'catatan' => $request->catatan,
        ]);

        // Send Email Approved
        try {
            Mail::to($surat->email)->send(new SuratApproved($surat));
        } catch (\Exception $e) {
            Log::error('Failed to send SuratApproved email: ' . $e->getMessage());
        }

        return redirect()->route('admin.surat.show', $surat->id)
            ->with('success', 'Pengajuan surat berhasil disetujui dan email notifikasi telah dikirim.');
    }

    /**
     * Reject the submission with a reason.
     */
    public function reject(Request $request, $id)
    {
        $surat = PengajuanSurat::findOrFail($id);

        if ($surat->status !== 'Menunggu') {
            return back()->with('error', 'Pengajuan ini sudah diproses sebelumnya.');
        }

        $request->validate([
            'catatan' => 'required|string|max:1000', // Wajib mencantumkan alasan penolakan
        ]);

        $surat->update([
            'status' => 'Ditolak',
            'catatan' => $request->catatan,
        ]);

        // Send Email Rejected
        try {
            Mail::to($surat->email)->send(new SuratRejected($surat));
        } catch (\Exception $e) {
            Log::error('Failed to send SuratRejected email: ' . $e->getMessage());
        }

        return redirect()->route('admin.surat.show', $surat->id)
            ->with('success', 'Pengajuan surat berhasil ditolak dan email notifikasi telah dikirim.');
    }

    /**
     * Download file bukti securely (restricted to authenticated admin).
     */
    public function downloadBukti($id)
    {
        $surat = PengajuanSurat::findOrFail($id);

        if (!$surat->file_bukti || !Storage::disk('local')->exists($surat->file_bukti)) {
            abort(404, 'File bukti tidak ditemukan.');
        }

        return Storage::disk('local')->response($surat->file_bukti);
    }

    /**
     * Download file surat physically uploaded by admin securely.
     */
    public function downloadSurat($id)
    {
        $surat = PengajuanSurat::findOrFail($id);

        if (!$surat->file_surat || !Storage::disk('local')->exists($surat->file_surat)) {
            abort(404, 'File surat tidak ditemukan.');
        }

        return Storage::disk('local')->response($surat->file_surat);
    }
}
