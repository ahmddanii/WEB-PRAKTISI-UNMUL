<?php

namespace App\Http\Controllers;

use App\Models\PengajuanSurat;
use App\Models\Jadwal;
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
            'nama' => 'required|string|max:100',
            'nim' => 'required|string|max:20',
            'email' => 'required|email|max:100',
            'no_hp' => 'nullable|string|max:20',
            'matkul' => 'required|string|max:150',
            'kelas_sesi' => 'required|string|max:100', // Kelas/Sesi Saat Ini (Wajib)
            'tanggal_praktikum' => 'required|date',
            'alasan' => 'required|string|max:1000',
            'file_bukti' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'request_pindah_sesi' => 'nullable|boolean',
        ];

        // Jika pindah sesi dicentang, sesi_tujuan wajib diisi
        if ($request->boolean('request_pindah_sesi')) {
            $rules['sesi_tujuan'] = 'required|string|max:255';
        }

        $request->validate($rules);

        $data = [
            'jenis_surat' => 'Izin Tidak Hadir', // jenis tunggal
            'nama' => $request->nama,
            'nim' => $request->nim,
            'email' => $request->email,
            'no_hp' => $request->no_hp,
            'matkul' => $request->matkul,
            'kelas_sesi' => $request->kelas_sesi,
            'tanggal_praktikum' => $request->tanggal_praktikum,
            'alasan' => $request->alasan,
            'status' => 'Menunggu',
            'sesi_asal' => $request->kelas_sesi, // default sesi asal adalah kelas_sesi
            'sesi_tujuan' => $request->boolean('request_pindah_sesi') ? $request->sesi_tujuan : null,
        ];

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

        // Send email confirmation (Konfirmasi Terima)
        try {
            Mail::to($pengajuan->email)->send(new SuratSubmitted($pengajuan));
        } catch (\Exception $e) {
            Log::error('Failed to send SuratSubmitted email: ' . $e->getMessage());
        }

        // Redirect back with success details for rendering the modal
        return redirect()->route('surat.form')->with('success_pengajuan', [
            'id' => $pengajuan->id,
            'nomor_pengajuan' => $nomor,
            'nama' => $pengajuan->nama,
            'email' => $pengajuan->email,
        ]);
    }

    /**
     * Fetch available schedules dynamically from jadwal table.
     */
    public function jadwalTersedia(Request $request)
    {
        $query = Jadwal::with(['matkul', 'kelas', 'ruangan']);

        if ($request->filled('matkul')) {
            $matkulName = $request->matkul;
            $query->whereHas('matkul', function ($q) use ($matkulName) {
                $q->where('nama_mk', $matkulName);
            });
        }

        $jadwal = $query->get()
            ->map(fn($j) => [
                'value' => ($j->kelas && $j->ruangan)
                    ? "{$j->kelas->kelas} — {$j->hari}, {$j->jam_mulai} ({$j->ruangan->nama_ruangan})"
                    : "Jadwal #{$j->id}",
                'label' => ($j->matkul && $j->kelas && $j->ruangan)
                    ? "{$j->matkul->nama_mk} | {$j->kelas->kelas} | {$j->hari} {$j->jam_mulai}–{$j->jam_selesai} | {$j->ruangan->nama_ruangan}"
                    : "Jadwal #{$j->id}",
            ]);

        return response()->json($jadwal);
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

        // Return secure inline view response
        return Storage::disk('local')->response($pengajuan->file_surat);
    }
}
