<?php

namespace Database\Seeders;

use App\Models\Berita;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        $berita = [
            [
                'judul' => 'Pembukaan Praktikum Sistem Informasi Semester Genap 2025/2026',
                'kategori' => 'Pengumuman',
                'author' => 'Admin PRAKTISI',
                'isi' => '<p>Laboratorium Sistem Informasi Fakultas Teknik Universitas Mulawarman dengan resmi membuka pendaftaran praktikum untuk semester genap tahun akademik 2025/2026. Pendaftaran dibuka mulai tanggal 1 Juli 2026 hingga 14 Juli 2026.</p><p>Praktikum ini terbuka bagi seluruh mahasiswa Program Studi Sistem Informasi yang telah memenuhi persyaratan akademik. Adapun mata kuliah yang akan dipraktikumkan antara lain: Algoritma Pemrograman, Basis Data, Jaringan Komputer, Rekayasa Perangkat Lunak, dan Sistem Informasi Geografis.</p><p>Pendaftaran dilakukan secara online melalui website PRAKTISI. Mahasiswa diwajibkan untuk mengunggah bukti pembayaran praktikum dan memilih jadwal yang tersedia. Informasi lebih lanjut dapat diakses melalui menu Jadwal Praktikum.</p>',
            ],
            [
                'judul' => 'Workshop Pengembangan Aplikasi Web dengan Laravel 12',
                'kategori' => 'Kegiatan',
                'author' => 'Admin PRAKTISI',
                'isi' => '<p>Dalam rangka meningkatkan kompetensi mahasiswa di bidang pengembangan web, Laboratorium Sistem Informasi akan mengadakan Workshop Pengembangan Aplikasi Web menggunakan Laravel 12 dan React 19. Workshop ini akan dilaksanakan pada tanggal 20-22 Juli 2026 secara luring di Laboratorium SI.</p><p>Workshop ini akan membahas materi mulai dari fundamental Laravel, Eloquent ORM, Filament Admin Panel, hingga integrasi dengan React sebagai frontend. Peserta diharapkan memiliki dasar pemrograman PHP dan JavaScript.</p><p>Pendaftaran workshop dibuka untuk 30 peserta terdaftar. Sertifikat akan diberikan kepada peserta yang menyelesaikan seluruh rangkaian acara. Silakan daftar melalui menu Pengajuan Surat di website PRAKTISI.</p>',
            ],
            [
                'judul' => 'Pengumuman Hasil Seleksi Asisten Laboratorium 2026',
                'kategori' => 'Pengumuman',
                'author' => 'Admin PRAKTISI',
                'isi' => '<p>Setelah melalui serangkaian tahapan seleksi yang meliputi tes tertulis, praktik coding, dan wawancara, dengan ini diumumkan nama-nama calon asisten laboratorium yang dinyatakan lolos seleksi untuk periode 2026.</p><p>Sebanyak 12 mahasiswa telah berhasil melewati seleksi dan akan bergabung sebagai asisten laboratorium Sistem Informasi. Mereka akan bertugas mendampingi praktikum pada semester genap 2025/2026.</p><p>Bagi peserta yang namanya tercantum, diwajibkan untuk mengikuti briefing asisten pada tanggal 5 Juli 2026 pukul 09.00 WITA di Laboratorium SI. Surat pengangkatan resmi dapat diunduh melalui halaman Dokumen di website PRAKTISI.</p>',
            ],
        ];

        $sourceImages = [
            public_path('images/hero1.jpeg'),
            public_path('images/hero2.jpeg'),
            public_path('images/hero3.jpeg'),
        ];

        foreach ($berita as $index => $data) {
            $thumbnail = null;

            if (isset($sourceImages[$index]) && file_exists($sourceImages[$index])) {
                $filename = 'berita/' . Str::random(20) . '.jpeg';
                Storage::disk('public')->put(
                    $filename,
                    file_get_contents($sourceImages[$index])
                );
                $thumbnail = $filename;
            }

            Berita::create([
                'judul' => $data['judul'],
                'slug' => Str::slug($data['judul']),
                'kategori' => $data['kategori'],
                'author' => $data['author'],
                'isi' => $data['isi'],
                'thumbnail' => $thumbnail,
            ]);
        }

        $this->command->info('Berita berhasil di-seed!');
    }
}
