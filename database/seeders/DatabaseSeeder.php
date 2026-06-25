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
            'name' => 'Admin Praktisi',
            'username' => 'admin',
            'email' => 'admin@praktisi.unmul.ac.id',
            'password' => Hash::make('password'),
        ]);

        // Call other seeders
        $this->call([
            MataKuliahSeeder::class,
            RuanganSeeder::class,
            KelasPraktikumSeeder::class,
        ]);
    }
}