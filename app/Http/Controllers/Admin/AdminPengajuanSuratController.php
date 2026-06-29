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

        // Pindah Sesi filter (berdasarkan keberadaan sesi_tujuan)
        if ($request->filled('pindah_sesi')) {
            if ($request->pindah_sesi === 'ya') {
                $query->whereNotNull('sesi_tujuan');
            } elseif ($request->pindah_sesi === 'tidak') {
                $query->whereNull('sesi_tujuan');
            }
        }

        $surats = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return inertia('Admin/PengajuanSurat/Index', [
            'surats' => $surats,
            'filters' => $request->only(['search', 'status', 'pindah_sesi'])
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
     * Approve the submission and auto-generate the signed PDF letter.
     */
    public function approve(Request $request, $id)
    {
        $surat = PengajuanSurat::findOrFail($id);

        if ($surat->status !== 'Menunggu') {
            return back()->with('error', 'Pengajuan ini sudah diproses sebelumnya.');
        }

        $request->validate([
            'catatan' => 'nullable|string|max:1000',
        ]);

        // Signature signer: Ahmad Dani (or Head of Lab)
        $penandatangan = \App\Models\PengurusInti::where('nama', 'Ahmad Dani')->first()
            ?? \App\Models\PengurusInti::where('jabatan', 'like', '%Head%')->first()
            ?? \App\Models\PengurusInti::orderBy('urutan')->first();

        if (!$penandatangan) {
            return back()->with('error', 'Data penandatangan Ketua PI tidak ditemukan di database. Pastikan data pengurus terisi.');
        }

        // Generate Nomor Surat Otomatis
        $bulanRomawi = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
        $count = PengajuanSurat::where('status', 'Disetujui')
            ->whereYear('diproses_at', now()->year)
            ->count();
        $urutan = str_pad($count + 1, 3, '0', STR_PAD_LEFT);
        $nomorSurat = "{$urutan}/PRAKTISI-SI/{$bulanRomawi[now()->month - 1]}/" . now()->year;

        // Generate secure verification token & QR
        $token = hash('sha256', $surat->id . $surat->nim . config('app.key'));
        $qrData = route('surat.verifikasi', ['token' => $token]);
        
        $qrCode = base64_encode(
            \SimpleSoftwareIO\QrCode\Facades\QrCode::format('svg')
                ->errorCorrection('H')
                ->merge(public_path('images/logo_clean.png'), 0.25, true)
                ->size(150)
                ->generate($qrData)
        );

        // Generate PDF
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('surat.izin-praktikum', [
            'pengajuan' => $surat,
            'penandatangan' => $penandatangan,
            'nomorSurat' => $nomorSurat,
            'qrCode' => $qrCode,
        ]);

        $fileName = 'surat/Surat_Izin_Praktikum_' . $surat->nim . '_' . time() . '.pdf';
        Storage::disk('local')->put($fileName, $pdf->output());

        // Update database
        $surat->update([
            'status' => 'Disetujui',
            'file_surat' => $fileName,
            'catatan' => $request->catatan,
            'token' => $token,
            'diproses_oleh' => auth()->id(),
            'diproses_at' => now(),
        ]);

        // Send Email Approved
        try {
            Mail::to($surat->email)->send(new SuratApproved($surat));
        } catch (\Exception $e) {
            Log::error('Failed to send SuratApproved email: ' . $e->getMessage());
        }

        // Archive to Google Drive (fail-safe)
        try {
            $driveService = new \App\Services\GoogleDriveService();
            $driveService->archiveToDrive($fileName, 'Surat_Izin_Praktikum_' . $surat->nim . '_' . $surat->nomor_pengajuan . '.pdf');
        } catch (\Exception $e) {
            Log::error('Failed to archive to Google Drive: ' . $e->getMessage());
        }

        return redirect()->route('admin.surat.show', $surat->id)
            ->with('success', 'Pengajuan surat berhasil disetujui, PDF di-generate otomatis, dan email notifikasi telah dikirim.');
    }

    /**
     * Preview the PDF letter layout without approving.
     */
    public function preview($id)
    {
        $surat = PengajuanSurat::findOrFail($id);

        // Signature signer: Ahmad Dani (or Head of Lab)
        $penandatangan = \App\Models\PengurusInti::where('nama', 'Ahmad Dani')->first()
            ?? \App\Models\PengurusInti::where('jabatan', 'like', '%Head%')->first()
            ?? \App\Models\PengurusInti::orderBy('urutan')->first();

        if (!$penandatangan) {
            return back()->with('error', 'Data penandatangan Ketua PI tidak ditemukan di database. Pastikan data pengurus terisi.');
        }

        // Generate Nomor Surat Otomatis (Simulation)
        $bulanRomawi = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
        $count = PengajuanSurat::where('status', 'Disetujui')
            ->whereYear('diproses_at', now()->year)
            ->count();
        $urutan = str_pad($count + 1, 3, '0', STR_PAD_LEFT);
        $nomorSurat = "{$urutan}/PRAKTISI-SI/{$bulanRomawi[now()->month - 1]}/" . now()->year;

        // Generate verification URL & QR for preview
        $token = hash('sha256', $surat->id . $surat->nim . config('app.key'));
        $qrData = route('surat.verifikasi', ['token' => $token]);
        
        $qrCode = base64_encode(
            \SimpleSoftwareIO\QrCode\Facades\QrCode::format('svg')
                ->errorCorrection('H')
                ->merge(public_path('images/logo_clean.png'), 0.25, true)
                ->size(150)
                ->generate($qrData)
        );

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('surat.izin-praktikum', [
            'pengajuan' => $surat,
            'penandatangan' => $penandatangan,
            'nomorSurat' => $nomorSurat,
            'qrCode' => $qrCode,
        ]);

        return $pdf->stream('Preview_Surat_Izin_' . $surat->nim . '.pdf');
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
            'diproses_oleh' => auth()->id(),
            'diproses_at' => now(),
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
