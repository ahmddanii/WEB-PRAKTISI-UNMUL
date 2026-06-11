@extends('layouts.app')

@section('title', 'Dokumen Praktikum')

@section('content')
<main class="py-20 px-5 md:px-8 max-w-[1280px] mx-auto min-h-[80vh] flex items-center justify-center">
    
    <div class="text-center max-w-2xl mx-auto p-10 md:p-14 rounded-3xl bg-white border border-gray-200 shadow-md">
        
        <div class="w-24 h-24 bg-[#455d97]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#455d97] relative">
            <span class="material-symbols-outlined text-6xl">inventory_2</span>
            <span class="material-symbols-outlined text-2xl absolute -bottom-1 -right-1 text-[#bc000a] bg-white rounded-full p-1 animate-[spin_4s_linear_infinite]">settings</span>
        </div>

        <h1 class="text-3xl md:text-4xl font-extrabold text-[#455d97] mb-4 tracking-tight">
            Dokumen Sedang Disusun
        </h1>
        <p class="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            Mohon maaf, halaman dan berkas panduan dokumen praktikum saat ini masih dalam tahap penyusunan dan perbaikan. Silakan kunjungi kembali halaman ini secara berkala.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
            <a href="/" class="bg-[#455d97] hover:bg-[#3b4f80] text-white px-6 py-3 rounded-xl font-bold font-mono text-sm tracking-wider transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2">
                <span class="material-symbols-outlined text-base">home</span> KEMBALI KE BERANDA
            </a>
            <a href="{{ route('jadwal') }}" class="bg-white border-2 border-gray-200 hover:border-[#455d97] hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-bold font-mono text-sm tracking-wider transition-all flex items-center gap-2">
                <span class="material-symbols-outlined text-base">calendar_month</span> LIHAT JADWAL
            </a>
        </div>

    </div>

</main>
@endsection