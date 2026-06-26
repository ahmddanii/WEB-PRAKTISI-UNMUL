<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
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
            'kategori' => 'required|in:pengaduan,aspirasi',
            'angkatan' => 'required|integer|min:2000|max:' . (now()->year + 1),
            'mata_kuliah_id' => 'nullable|exists:mata_kuliah,id',
            'isi_pengaduan' => 'required|string|max:2000',
            'lampiran' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:3072',
            'nama_pelapor' => 'nullable|string|max:100',
            'nim_pelapor' => 'nullable|string|max:20',
        ]);

        $data = [
            'kategori' => $request->kategori,
            'angkatan' => $request->angkatan,
            'mata_kuliah_id' => $request->mata_kuliah_id ?: null,
            'isi_pengaduan' => $request->isi_pengaduan,
            'nama_pelapor' => $request->nama_pelapor ?: null,
            'nim_pelapor' => $request->nim_pelapor ?: null,
            'status' => 'baru',
        ];

        if ($request->hasFile('lampiran')) {
            // Stored in secure storage/app/private/lampiran
            $data['file_lampiran'] = $request->file('lampiran')->store('lampiran', 'local');
        }

        $pengaduan = Pengaduan::create($data);

        return redirect()->route('pengaduan.index')->with('success_ticket', $pengaduan->nomor_tiket);
    }

    /**
     * Fetch courses dynamically based on batch (angkatan).
     */
    public function matkulByAngkatan(Request $request)
    {
        $angkatan = (int) $request->angkatan;
        $tahunSekarang = now()->year;
        
        // Jika bulan saat ini sebelum Agustus (bulan 1-7), maka kita masih di tahun ajaran sebelumnya
        if (now()->month < 8) {
            $tahunSekarang -= 1;
        }

        $semesterMulai = ($tahunSekarang - $angkatan) * 2 + 1;
        $semesterAkhir = $semesterMulai + 1;

        $matkul = MataKuliah::whereBetween('semester', [$semesterMulai, $semesterAkhir])
            ->orderBy('nama_mk')
            ->get(['id', 'nama_mk']);

        return response()->json($matkul);
    }
}
