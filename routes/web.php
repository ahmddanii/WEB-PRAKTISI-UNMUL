<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\PengurusController;
use App\Models\Berita;

// 1. ROUTE BERANDA PUBLIK
Route::get('/', function () {
    $beritaTerbaru = Berita::latest()->take(3)->get();
    return inertia('Beranda', compact('beritaTerbaru'));
});

Route::get('/dokumen', function () {
    return inertia('Dokumen');
})->name('dokumen');

Route::get('/jadwal', [App\Http\Controllers\JadwalController::class, 'publicIndex'])->name('jadwal');

Route::get('/berita', function () {
    // Mengambil berita terbaru ke terlama, dibatasi 9 berita per halaman (pagination)
    $semuaBerita = \App\Models\Berita::latest()->paginate(9);
    return inertia('Berita', compact('semuaBerita'));
})->name('berita.semua');

Route::get('/berita/{slug}', function ($slug) {
    $berita = Berita::where('slug', $slug)->firstOrFail();
    return inertia('BeritaDetail', compact('berita'));
});

Route::get('/kontak', function () {
    return inertia('Kontak');
})->name('kontak');

// Route untuk halaman Tentang Kami
Route::get('/tentang', function () {
    $pengurusInti = \App\Models\PengurusInti::orderBy('urutan', 'asc')->get();
    $koordinatorMatkul = \App\Models\KoordinatorMatkul::with('matkul')->latest()->get();
    
    return inertia('Tentang', compact('pengurusInti', 'koordinatorMatkul'));
})->name('tentang');
// 2. ROUTE GUEST
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate']);
});

// 3. ROUTE ADMIN
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    // Dashboard
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Berita (Menggunakan names agar rute admin.berita.index terdaftar)
    Route::resource('admin/berita', BeritaController::class)->names([
        'index' => 'admin.berita.index',
        'create' => 'admin.berita.create',
        'store' => 'admin.berita.store',
        'show' => 'admin.berita.show',
        'edit' => 'admin.berita.edit',
        'update' => 'admin.berita.update',
        'destroy' => 'admin.berita.destroy',
    ]);

    // Pengurus & Koordinator
    Route::get('/admin/pengurus', [PengurusController::class, 'index'])->name('pengurus.index');
    Route::post('/admin/pengurus/inti', [PengurusController::class, 'storeInti'])->name('pengurus.inti.store');
    Route::put('/admin/pengurus/inti/{id}', [PengurusController::class, 'updateInti'])->name('pengurus.inti.update');
    Route::delete('/admin/pengurus/inti/{id}', [PengurusController::class, 'destroyInti'])->name('pengurus.inti.destroy');
    Route::post('/admin/pengurus/inti/{id}/up', [PengurusController::class, 'moveUpInti'])->name('pengurus.inti.up');
    Route::post('/admin/pengurus/inti/{id}/down', [PengurusController::class, 'moveDownInti'])->name('pengurus.inti.down');

    Route::post('/admin/pengurus/koor', [PengurusController::class, 'storeKoor'])->name('pengurus.koor.store');
    Route::put('/admin/pengurus/koor/{id}', [PengurusController::class, 'updateKoor'])->name('pengurus.koor.update');
    Route::delete('/admin/pengurus/koor/{id}', [PengurusController::class, 'destroyKoor'])->name('pengurus.koor.destroy');

    // Jadwal
    Route::get('/admin/jadwal', [JadwalController::class, 'index'])->name('jadwal.index');
    Route::post('/admin/jadwal/simpan', [JadwalController::class, 'simpanMassal'])->name('jadwal.simpan');
    Route::get('/admin/jadwal/matkul', [JadwalController::class, 'matkulIndex'])->name('jadwal.matkul');
    Route::post('/admin/jadwal/matkul', [JadwalController::class, 'matkulStore'])->name('jadwal.matkul.store');
    Route::delete('/admin/jadwal/matkul/{id}', [JadwalController::class, 'matkulDestroy'])->name('jadwal.matkul.destroy');
    Route::get('/admin/jadwal/kelas', [JadwalController::class, 'kelasIndex'])->name('jadwal.kelas');
    Route::post('/admin/jadwal/kelas', [JadwalController::class, 'kelasStore'])->name('jadwal.kelas.store');
    Route::delete('/admin/jadwal/kelas/{id}', [JadwalController::class, 'kelasDestroy'])->name('jadwal.kelas.destroy');
});