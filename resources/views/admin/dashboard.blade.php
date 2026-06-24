@extends('layouts.admin')

@section('title', 'Ringkasan Dashboard')

@section('header_title', 'Dashboard Utama')
@section('header_subtitle', 'Ringkasan aktivitas dan status portal praktikum')

@section('content')
<section class="p-8">
    
    <div class="flex items-center gap-2 mb-6">
        <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span class="text-sm font-medium text-gray-600">Sistem Berjalan Normal</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div class="academic-card p-6 rounded-xl group">
            <div class="flex justify-between items-start mb-4">
                <span class="text-gray-500 font-mono text-[12px] uppercase tracking-wider">Total Berita</span>
                <span class="material-symbols-outlined text-[#203971] group-hover:scale-110 transition-transform">drafts</span>
            </div>
            <div class="text-4xl font-bold text-[#F32923]">{{ $totalBerita }}</div>
            <div class="mt-2 text-[12px] text-gray-500 font-bold font-mono">Berita dipublikasi</div>
        </div>
        
        <div class="academic-card p-6 rounded-xl group">
            <div class="flex justify-between items-start mb-4">
                <span class="text-gray-500 font-mono text-[12px] uppercase tracking-wider">Jumlah Pengurus</span>
                <span class="material-symbols-outlined text-[#203971] group-hover:scale-110 transition-transform">badge</span>
            </div>
            <div class="text-4xl font-bold text-[#203971]">{{ $totalPengurus }}</div>
            <div class="mt-2 text-[12px] text-gray-500 font-bold font-mono">Pengurus aktif</div>
        </div>
        
        <div class="academic-card p-6 rounded-xl group">
            <div class="flex justify-between items-start mb-4">
                <span class="text-gray-500 font-mono text-[12px] uppercase tracking-wider">Mata Kuliah Praktikum</span>
                <span class="material-symbols-outlined text-[#203971] group-hover:scale-110 transition-transform">menu_book</span>
            </div>
            <div class="text-4xl font-bold text-[#203971]">{{ $totalMatkul }}</div>
            <div class="mt-2 text-[12px] text-blue-600 font-bold flex items-center gap-1 font-mono">
                <span class="material-symbols-outlined text-sm">check_circle</span> Terdaftar di sistem
            </div>
        </div>
    </div>

    <div class="mt-12">
        <h3 class="font-bold text-[12px] uppercase tracking-widest text-gray-500 font-mono mb-6">Aksi Cepat</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a href="{{ route('jadwal.index') }}" class="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-gray-300 hover:border-[#203971] hover:bg-[#203971]/5 transition-all group rounded-xl">
                <span class="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-[#203971]">edit_calendar</span>
                <span class="font-bold text-[14px] text-[#203971]">Kelola Jadwal</span>
            </a>
            <a href="{{ route('admin.berita.index') }}" class="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-gray-300 hover:border-[#203971] hover:bg-[#203971]/5 transition-all group rounded-xl">
                <span class="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-[#203971]">history_edu</span>
                <span class="font-bold text-[14px] text-[#203971]">Tulis Berita</span>
            </a>
            <a href="{{ route('pengurus.index') }}" class="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-gray-300 hover:border-[#203971] hover:bg-[#203971]/5 transition-all group rounded-xl">
                <span class="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-[#203971]">person_add</span>
                <span class="font-bold text-[14px] text-[#203971]">Tambah Pengurus</span>
            </a>
        </div>
    </div>
    </div>
</section>
@endsection