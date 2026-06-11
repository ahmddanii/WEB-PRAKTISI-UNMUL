<?php

namespace Database\Seeders;

use App\Models\KelasPraktikum;
use Illuminate\Database\Seeder;

class KelasPraktikumSeeder extends Seeder
{
    public function run(): void
    {
        $kelasPraktikum = [
            ['kelas' => 'A', 'angkatan' => 2024],
            ['kelas' => 'B', 'angkatan' => 2024],
            ['kelas' => 'C', 'angkatan' => 2024],
            
            ['kelas' => 'A', 'angkatan' => 2025],
            ['kelas' => 'B', 'angkatan' => 2025],
            ['kelas' => 'C', 'angkatan' => 2025],
        ];

        foreach ($kelasPraktikum as $kp) {
            KelasPraktikum::create($kp);
        }
    }
}