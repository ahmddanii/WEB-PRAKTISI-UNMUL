<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seeding default Admin
        User::create([
            'name' => 'Admin Praktikum Sistem Informasi Unmul',
            'username' => env('ADMIN_USERNAME', 'admin_praktikum'),
            'email' => env('ADMIN_EMAIL', 'admpraktikumsiunmul@gmail.com'),
            'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
        ]);

        // Call other seeders
        $this->call([
            MataKuliahSeeder::class,
            RuanganSeeder::class,
            KelasPraktikumSeeder::class,
            BeritaSeeder::class,
        ]);
    }
}
