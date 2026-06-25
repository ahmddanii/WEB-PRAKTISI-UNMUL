<?php

namespace App\Http\Controllers;

use App\Models\Ruangan;
use App\Models\KelasPraktikum;
use App\Models\MataKuliah;
use App\Models\Jadwal;
use Illuminate\Http\Request;

class JadwalController extends Controller
{
    public function publicIndex(Request $request)
    {
        $ruangans = Ruangan::all();
        
        $ruanganAktif = $request->ruangan_id ? Ruangan::findOrFail($request->ruangan_id) : Ruangan::first();

        $jadwals = Jadwal::with(['kelas', 'matkul'])->where('ruangan_id', $ruanganAktif->id)->get();
        
        $jadwalMapped = [];
        foreach ($jadwals as $j) {
            $hariTabel = strtoupper($j->hari);
            $jamMulai = date('H:i', strtotime($j->jam_mulai));
            $jamSelesai = date('H:i', strtotime($j->jam_selesai));
            $jamTabel = $jamMulai . ' - ' . $jamSelesai;

            $jadwalMapped[$hariTabel][$jamTabel] = $j;
        }

        $waktuStandar = ['07:30 - 09:00', '09:10 - 10:40', '10:50 - 12:20', '13:00 - 14:30', '14:40 - 16:10', '16:20 - 17:50'];
        $waktuJumat   = ['07:30 - 09:00', '09:10 - 10:40', '10:50 - 12:20', '13:30 - 15:00', '15:10 - 16:30', '16:40 - 17:50'];

        $hariJadwal = [
            'SENIN'  => $waktuStandar,
            'SELASA' => $waktuStandar,
            'RABU'   => $waktuStandar,
            'KAMIS'  => $waktuStandar,
            'JUMAT'  => $waktuJumat,
        ];

        return inertia('Jadwal', compact('ruangans', 'ruanganAktif', 'hariJadwal', 'jadwalMapped'));
    }
    
    public function index(Request $request)
    {
        $ruangans = Ruangan::all();
        $kelases = KelasPraktikum::orderBy('angkatan', 'desc')->orderBy('kelas', 'asc')->get();
        $matkuls = MataKuliah::all();

        $ruanganAktif = $request->ruangan_id ? Ruangan::findOrFail($request->ruangan_id) : Ruangan::first();

        $jadwals = Jadwal::with(['kelas', 'matkul'])->where('ruangan_id', $ruanganAktif->id)->get();
        
        $jadwalMapped = [];
        foreach ($jadwals as $j) {
            $hariTabel = strtoupper($j->hari);
            
            $jamMulai = date('H:i', strtotime($j->jam_mulai));
            $jamSelesai = date('H:i', strtotime($j->jam_selesai));
            $jamTabel = $jamMulai . ' - ' . $jamSelesai;

            $jadwalMapped[$hariTabel][$jamTabel] = $j;
        }

        $waktuStandar = ['07:30 - 09:00', '09:10 - 10:40', '10:50 - 12:20', '13:00 - 14:30', '14:40 - 16:10', '16:20 - 17:50'];
        $waktuJumat   = ['07:30 - 09:00', '09:10 - 10:40', '10:50 - 12:20', '13:30 - 15:00', '15:10 - 16:30', '16:40 - 17:50'];

        $hariJadwal = [
            'SENIN'  => $waktuStandar,
            'SELASA' => $waktuStandar,
            'RABU'   => $waktuStandar,
            'KAMIS'  => $waktuStandar,
            'JUMAT'  => $waktuJumat,
        ];

        return inertia('Admin/Jadwal/Index', compact('ruangans', 'kelases', 'matkuls', 'ruanganAktif', 'hariJadwal', 'jadwalMapped'));
    }

    public function simpanMassal(Request $request)
    {
        $ruangan_id = $request->ruangan_id;
        $dataJadwal = $request->jadwal; 

        Jadwal::where('ruangan_id', $ruangan_id)->delete();

        if ($dataJadwal) {
            foreach ($dataJadwal as $hari => $jams) {
                $hariDatabase = ucfirst(strtolower($hari));

                foreach ($jams as $jam => $data) {
                    if (!empty($jam) && !empty($data['kelas_id']) && !empty($data['mata_kuliah_id'])) {
                        
                        $jamParts = explode(' - ', $jam);

                        Jadwal::create([
                            'ruangan_id'     => $ruangan_id,
                            'hari'           => $hariDatabase,
                            'jam_mulai'      => trim($jamParts[0]),
                            'jam_selesai'    => trim($jamParts[1]),
                            'kelas_id'       => $data['kelas_id'],
                            'mata_kuliah_id' => $data['mata_kuliah_id'], // HARUS mata_kuliah_id
                        ]);
                    }
                }
            }
        }

        return redirect()->back()->with('success', 'Jadwal berhasil diperbarui!');
    }

    public function matkulIndex()
    {
        $matkuls = MataKuliah::orderBy('semester', 'asc')->get();
        return inertia('Admin/Jadwal/Matkul', compact('matkuls'));
    }

    public function matkulStore(Request $request)
    {
        $request->validate([
            'kode_mk' => 'required|string|max:50',
            'nama_mk' => 'required|string|max:255',
            'semester' => 'required|integer',
        ]);

        MataKuliah::create($request->all());
        return redirect()->back()->with('success', 'Mata Kuliah berhasil ditambahkan!');
    }

    public function matkulDestroy($id)
    {
        MataKuliah::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Mata Kuliah berhasil dihapus!');
    }

    public function kelasIndex()
    {
        $kelases = KelasPraktikum::orderBy('angkatan', 'desc')->orderBy('kelas', 'asc')->get();
        return inertia('Admin/Jadwal/Kelas', compact('kelases'));
    }

    public function kelasStore(Request $request)
    {
        $request->validate([
            'kelas' => 'required|string|max:10',
            'angkatan' => 'required|integer',
        ]);

        KelasPraktikum::create($request->all());
        return redirect()->back()->with('success', 'Kelas berhasil ditambahkan!');
    }

    public function kelasDestroy($id)
    {
        KelasPraktikum::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Kelas berhasil dihapus!');
    }
}