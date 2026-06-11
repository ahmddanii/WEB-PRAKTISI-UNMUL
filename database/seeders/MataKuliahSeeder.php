<?php

namespace Database\Seeders;

use App\Models\MataKuliah;
use Illuminate\Database\Seeder;

class MataKuliahSeeder extends Seeder
{
    public function run(): void
    {
        $mataKuliah = [
            ['kode_mk' => 'AVD', 'nama_mk' => 'Analitik dan Visualisasi Data', 'semester' => 2],
            ['kode_mk' => 'KBD', 'nama_mk' => 'Konsep Basis Data', 'semester' => 2],
            ['kode_mk' => 'SO',  'nama_mk' => 'Sistem Operasi', 'semester' => 2],
            
            // Semester 4
            ['kode_mk' => 'PAB', 'nama_mk' => 'Pemrograman Aplikasi Bergerak', 'semester' => 4],
            ['kode_mk' => 'PBW', 'nama_mk' => 'Pemrograman Berbasis Web', 'semester' => 4],
            ['kode_mk' => 'KJ',  'nama_mk' => 'Keamanan Jaringan', 'semester' => 4],
        ];

        foreach ($mataKuliah as $mk) {
            MataKuliah::create($mk);
        }
    }
}