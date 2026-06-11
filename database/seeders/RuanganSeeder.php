<?php

namespace Database\Seeders;

use App\Models\Ruangan;
use Illuminate\Database\Seeder;

class RuanganSeeder extends Seeder
{
    public function run(): void
    {
        $ruangan = [
            ['kode_ruangan' => 'D208', 'nama_ruangan' => 'Basic Programming 2', 'lantai' => 2],
            ['kode_ruangan' => 'D203', 'nama_ruangan' => 'Basic Programming 1', 'lantai' => 2],
            ['kode_ruangan' => 'D303', 'nama_ruangan' => 'Web Engineering', 'lantai' => 3],
            ['kode_ruangan' => 'D307', 'nama_ruangan' => 'Network Engineering', 'lantai' => 3],
            ['kode_ruangan' => 'D407', 'nama_ruangan' => 'Multimedia', 'lantai' => 4],
            ['kode_ruangan' => 'D403', 'nama_ruangan' => 'Robotic', 'lantai' => 4],
        ];

        foreach ($ruangan as $r) {
            Ruangan::create($r);
        }
    }
}