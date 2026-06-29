<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\PengurusController;
use App\Http\Controllers\PengajuanSuratController;
use App\Http\Controllers\PengaduanController;
use App\Http\Controllers\Admin\AdminPengajuanSuratController;
use App\Http\Controllers\Admin\AdminPengaduanController;
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
    $isPengaduanOpen = \App\Models\Setting::where('key', 'pengaduan_is_open')->value('value') !== 'false';
    return inertia('Kontak', compact('isPengaduanOpen'));
})->name('kontak');

// Route untuk halaman Tentang Kami
Route::get('/tentang', function () {
    $pengurusInti = \App\Models\PengurusInti::orderBy('urutan', 'asc')->get();
    $koordinatorMatkul = \App\Models\KoordinatorMatkul::with('matkul')->latest()->get();
    
    return inertia('Tentang', compact('pengurusInti', 'koordinatorMatkul'));
})->name('tentang');

// Route untuk Pengajuan Surat Digital
Route::get('/pengajuan-surat', [PengajuanSuratController::class, 'index'])->name('surat.form');
Route::post('/pengajuan-surat', [PengajuanSuratController::class, 'store'])->name('surat.store');
Route::get('/pengajuan-surat/download/{id}/{token}', [PengajuanSuratController::class, 'downloadSurat'])->name('surat.download');
Route::get('/verifikasi-surat/{token}', [PengajuanSuratController::class, 'verifikasiSurat'])->name('surat.verifikasi');
Route::get('/api/jadwal-tersedia', [PengajuanSuratController::class, 'jadwalTersedia'])->name('api.jadwal-tersedia');

// Route untuk Form Pengaduan & Aspirasi
Route::get('/pengaduan', [PengaduanController::class, 'index'])->name('pengaduan.index');
Route::post('/pengaduan', [PengaduanController::class, 'store'])->name('pengaduan.store');
Route::get('/api/matkul-by-angkatan', [PengaduanController::class, 'matkulByAngkatan'])->name('api.matkul-by-angkatan');
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

    // Admin Pengajuan Surat
    Route::get('/admin/pengajuan-surat', [AdminPengajuanSuratController::class, 'index'])->name('admin.surat.index');
    Route::get('/admin/pengajuan-surat/{id}', [AdminPengajuanSuratController::class, 'show'])->name('admin.surat.show');
    Route::get('/admin/pengajuan-surat/{id}/preview', [AdminPengajuanSuratController::class, 'preview'])->name('admin.surat.preview');
    Route::post('/admin/pengajuan-surat/{id}/approve', [AdminPengajuanSuratController::class, 'approve'])->name('admin.surat.approve');
    Route::post('/admin/pengajuan-surat/{id}/reject', [AdminPengajuanSuratController::class, 'reject'])->name('admin.surat.reject');
    Route::get('/admin/pengajuan-surat/{id}/bukti', [AdminPengajuanSuratController::class, 'downloadBukti'])->name('admin.surat.bukti');
    Route::get('/admin/pengajuan-surat/{id}/file', [AdminPengajuanSuratController::class, 'downloadSurat'])->name('admin.surat.file');

    // Admin Pengaduan
    Route::get('/admin/pengaduan/presentasi', [AdminPengaduanController::class, 'presentasi'])->name('admin.pengaduan.presentasi');
    Route::get('/admin/pengaduan/presentasi/data', [AdminPengaduanController::class, 'presentasiData'])->name('admin.pengaduan.presentasi-data');
    Route::get('/admin/pengaduan', [AdminPengaduanController::class, 'index'])->name('admin.pengaduan.index');
    Route::get('/admin/pengaduan/{id}', [AdminPengaduanController::class, 'show'])->name('admin.pengaduan.show');
    Route::post('/admin/pengaduan/{id}/tandai-dibahas', [AdminPengaduanController::class, 'tandaiDibahas'])->name('admin.pengaduan.tandai-dibahas');
    Route::post('/admin/pengaduan/toggle-status', [AdminPengaduanController::class, 'toggleStatus'])->name('admin.pengaduan.toggle-status');
    Route::get('/admin/pengaduan/{id}/lampiran', [AdminPengaduanController::class, 'downloadLampiran'])->name('admin.pengaduan.lampiran');
});