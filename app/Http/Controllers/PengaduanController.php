<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use App\Mail\PengaduanSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class PengaduanController extends Controller
{
    /**
     * Display the public complaint submission form.
     */
    public function index()
    {
        return inertia('Pengaduan/Form');
    }

    /**
     * Handle public submission of complaints.
     */
    public function store(Request $request)
    {
        $request->validate([
            'kategori' => 'required|in:Keluhan,Saran,Pertanyaan,Lainnya',
            'nama' => 'required|string|max:100',
            'nim' => 'required|string|max:20',
            'email' => 'required|email|max:100',
            'no_hp' => 'nullable|string|max:20',
            'matkul_terkait' => 'nullable|string|max:150',
            'judul' => 'required|string|max:200',
            'isi' => 'required|string|max:2000',
            'lampiran' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:3072',
        ]);

        $data = $request->except(['lampiran']);

        if ($request->hasFile('lampiran')) {
            // Stored in secure storage/app/private/lampiran
            $data['lampiran'] = $request->file('lampiran')->store('lampiran', 'local');
        }

        // Create pengaduan first to get ID
        $pengaduan = Pengaduan::create($data);

        // Update with nomor_tiket
        $tiket = '#T' . str_pad($pengaduan->id, 5, '0', STR_PAD_LEFT);
        $pengaduan->update([
            'nomor_tiket' => $tiket,
        ]);

        // Send email confirmation
        try {
            Mail::to($pengaduan->email)->send(new PengaduanSubmitted($pengaduan));
        } catch (\Exception $e) {
            Log::error('Failed to send PengaduanSubmitted email: ' . $e->getMessage());
        }

        return redirect()->route('pengaduan.status', [
            'id' => $pengaduan->id,
            'token' => $pengaduan->generateToken()
        ])->with('success', 'Pengaduan berhasil dikirim! Silakan periksa email Anda atau simpan Nomor Tiket ini.');
    }

    /**
     * Handle checking status request.
     */
    public function checkStatus(Request $request)
    {
        $request->validate([
            'nim' => 'required|string',
            'nomor_tiket' => 'required|string',
        ]);

        $pengaduan = Pengaduan::where('nim', $request->nim)
            ->where('nomor_tiket', $request->nomor_tiket)
            ->first();

        if (!$pengaduan) {
            return back()->withErrors([
                'error' => 'Data pengaduan tidak ditemukan. Pastikan NIM dan Nomor Tiket benar.'
            ]);
        }

        return redirect()->route('pengaduan.status', [
            'id' => $pengaduan->id,
            'token' => $pengaduan->generateToken()
        ]);
    }

    /**
     * Display status detail of the complaint.
     */
    public function showStatus($id, $token)
    {
        $pengaduan = Pengaduan::findOrFail($id);

        if ($token !== $pengaduan->generateToken()) {
            abort(403, 'Akses ditolak. Token tidak valid.');
        }

        return inertia('Pengaduan/Status', [
            'pengaduan' => $pengaduan,
            'downloadUrl' => $pengaduan->lampiran ? route('pengaduan.download', ['id' => $pengaduan->id, 'token' => $pengaduan->generateToken()]) : null
        ]);
    }

    /**
     * Stream/download the uploaded lampiran file securely.
     */
    public function downloadLampiran($id, $token)
    {
        $pengaduan = Pengaduan::findOrFail($id);

        if ($token !== $pengaduan->generateToken()) {
            abort(403, 'Akses ditolak. Token tidak valid.');
        }

        if (!$pengaduan->lampiran || !Storage::disk('local')->exists($pengaduan->lampiran)) {
            abort(404, 'File lampiran tidak ditemukan di server.');
        }

        // Return secure inline view response
        return Storage::disk('local')->response($pengaduan->lampiran);
    }
}
