<?php

namespace App\Http\Controllers;

use App\Models\PengajuanSurat;
use App\Mail\SuratSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class PengajuanSuratController extends Controller
{
    /**
     * Display the public submission form.
     */
    public function index()
    {
        return inertia('PengajuanSurat/Form');
    }

    /**
     * Handle public submission of letters.
     */
    public function store(Request $request)
    {
        $rules = [
            'jenis_surat' => 'required|in:Izin Tidak Hadir,Pindah Sesi',
            'nama' => 'required|string|max:100',
            'nim' => 'required|string|max:20',
            'email' => 'required|email|max:100',
            'no_hp' => 'nullable|string|max:20',
            'matkul' => 'required|string|max:150',
            'kelas_sesi' => 'nullable|string|max:100',
            'tanggal_praktikum' => 'required|date',
            'alasan' => 'required|string|max:1000',
            'file_bukti' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];

        if ($request->jenis_surat === 'Pindah Sesi') {
            $rules['sesi_asal'] = 'required|string|max:50';
            $rules['sesi_tujuan'] = 'required|string|max:50';
        }

        $request->validate($rules);

        $data = $request->except(['file_bukti']);

        if ($request->hasFile('file_bukti')) {
            // Stored in secure storage/app/private/bukti
            $data['file_bukti'] = $request->file('file_bukti')->store('bukti', 'local');
        }

        // Create pengajuan first to get ID
        $pengajuan = PengajuanSurat::create($data);

        // Update with nomor_pengajuan and secure token
        $nomor = '#P' . str_pad($pengajuan->id, 5, '0', STR_PAD_LEFT);
        $pengajuan->update([
            'nomor_pengajuan' => $nomor,
            'token' => $pengajuan->generateToken()
        ]);

        // Send email confirmation
        try {
            Mail::to($pengajuan->email)->send(new SuratSubmitted($pengajuan));
        } catch (\Exception $e) {
            Log::error('Failed to send SuratSubmitted email: ' . $e->getMessage());
        }

        return redirect()->route('surat.status', [
            'id' => $pengajuan->id,
            'token' => $pengajuan->generateToken()
        ])->with('success', 'Pengajuan surat berhasil dikirim! Silakan periksa email Anda atau simpan nomor pengajuan ini.');
    }

    /**
     * Handle checking status request.
     */
    public function checkStatus(Request $request)
    {
        $request->validate([
            'nim' => 'required|string',
            'nomor_pengajuan' => 'required|string',
        ]);

        $pengajuan = PengajuanSurat::where('nim', $request->nim)
            ->where('nomor_pengajuan', $request->nomor_pengajuan)
            ->first();

        if (!$pengajuan) {
            return back()->withErrors([
                'error' => 'Data pengajuan tidak ditemukan. Pastikan NIM dan Nomor Pengajuan benar.'
            ]);
        }

        return redirect()->route('surat.status', [
            'id' => $pengajuan->id,
            'token' => $pengajuan->generateToken()
        ]);
    }

    /**
     * Display status detail.
     */
    public function showStatus($id, $token)
    {
        $pengajuan = PengajuanSurat::findOrFail($id);

        if ($token !== $pengajuan->generateToken()) {
            abort(403, 'Akses ditolak. Token tidak valid.');
        }

        return inertia('PengajuanSurat/Status', [
            'pengajuan' => $pengajuan,
            'downloadUrl' => route('surat.download', ['id' => $pengajuan->id, 'token' => $pengajuan->generateToken()])
        ]);
    }

    /**
     * Stream/download the approved PDF file securely.
     */
    public function downloadSurat($id, $token)
    {
        $pengajuan = PengajuanSurat::findOrFail($id);

        if ($token !== $pengajuan->generateToken()) {
            abort(403, 'Akses ditolak. Token tidak valid.');
        }

        if ($pengajuan->status !== 'Disetujui' || !$pengajuan->file_surat) {
            abort(404, 'Surat belum disetujui atau file tidak ditemukan.');
        }

        if (!Storage::disk('local')->exists($pengajuan->file_surat)) {
            abort(404, 'File surat fisik tidak ditemukan di server.');
        }

        // Return secure download response
        return Storage::disk('local')->download(
            $pengajuan->file_surat, 
            'Surat_Persetujuan_' . $pengajuan->nim . '.pdf'
        );
    }
}
