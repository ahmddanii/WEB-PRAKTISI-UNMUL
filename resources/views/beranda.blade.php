@extends('layouts.app')

@section('title', 'Beranda')

@section('content')
    <section class="relative py-16 md:py-40 flex items-center justify-center overflow-hidden hero-gradient px-8">
        <div class="max-w-[1280px] w-full flex flex-col text-center items-center">
            <div class="space-y-6 z-10 flex flex-col items-center">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-outline-variant shadow-sm">
                    <span class="w-2 h-2 rounded-full bg-[#bc000a]"></span>
                    <span class="text-xs font-bold uppercase tracking-widest text-gray-600">Academic Year 2025/2026</span>
                </div>
                
                <h1 class="text-4xl md:text-5xl font-bold text-[#455d97] max-w-3xl leading-tight">
                    Selamat datang di Web Praktikum Sistem Informasi
                </h1>
                
                <p class="text-base md:text-lg text-gray-600 max-w-2xl">
                    Tempat mengakses berbagai informasi dan layanan terkait praktikum sistem informasi dengan mudah dan cepat.
                </p>
                
                <div class="flex flex-wrap gap-4 justify-center pt-4">
                    <a href="#layanan" class="bg-[#455d97] text-white px-6 py-3 font-bold hover:shadow-lg transition-all rounded flex items-center gap-2">
                        Lihat Layanan <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                    <a href="/dokumen" class="border-2 border-[#455d97] text-[#455d97] px-6 py-3 font-bold hover:bg-[#455d97] hover:text-white transition-all rounded">
                        Panduan Praktikan
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section id="layanan" class="py-16 px-8 max-w-[1280px] mx-auto">
        <div class="flex flex-col items-center text-center mb-12">
            <h2 class="text-3xl text-[#455d97] mb-3 font-bold">Layanan yang Tersedia</h2>
            <p class="text-gray-600 max-w-2xl">Kami menyediakan berbagai layanan untuk mendukung proses belajar Kamu.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg border border-gray-200">
                <span class="material-symbols-outlined text-4xl text-[#ba1a1a] mb-4">calendar_month</span>
                <h4 class="text-lg text-[#455d97] font-bold mb-2">Jadwal Praktikum</h4>
                <p class="text-sm text-gray-600 mb-6 flex-grow">Jadwal praktikum yang terupdate dan mudah diakses.</p>
                <a href="/jadwal" class="bg-[#203971] text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all w-full">Lihat</a>
            </div>
            
            <div class="bg-white p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg border border-gray-200">
                <span class="material-symbols-outlined text-4xl text-[#ba1a1a] mb-4">gavel</span>
                <h4 class="text-lg text-[#455d97] font-bold mb-2">Peraturan Praktikum</h4>
                <p class="text-sm text-gray-600 mb-6 flex-grow">Aturan dan tata tertib selama praktikum berlangsung.</p>
                <a href="/dokumen" class="bg-[#203971] text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all w-full">Lihat</a>
            </div>

            <div class="bg-white p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg border border-gray-200">
                <span class="material-symbols-outlined text-4xl text-[#ba1a1a] mb-4">newspaper</span>
                <h4 class="text-lg text-[#455d97] font-bold mb-2">Berita & Pengumuman</h4>
                <p class="text-sm text-gray-600 mb-6 flex-grow">Informasi terbaru seputar kegiatan dan asisten laboratorium.</p>
                <a href="/berita" class="bg-[#203971] text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all w-full">Lihat</a>
            </div>

            <div class="bg-white p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg border border-gray-200">
                <span class="material-symbols-outlined text-4xl text-[#ba1a1a] mb-4">mail</span>
                <h4 class="text-lg text-[#455d97] font-bold mb-2">Kontak Kami</h4>
                <p class="text-sm text-gray-600 mb-6 flex-grow">Hubungi kami untuk bantuan dan informasi lebih lanjut.</p>
                <a href="/kontak" class="bg-[#203971] text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all w-full">Lihat</a>
            </div>
        </div>
    </section>

    <section class="py-16 bg-[#f9f9f9]">
        <div class="max-w-[1280px] mx-auto px-8">
            <div class="flex justify-between items-end mb-10">
                <h3 class="text-2xl md:text-3xl font-bold text-[#455d97]">Berita & Pengumuman</h3>
                <a class="hidden md:block font-bold text-[#455d97] border-b-2 border-[#455d97] pb-1 hover:text-[#bc000a] transition-colors" href="/berita">Lihat Semua Berita</a>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                @forelse ($beritaTerbaru as $item)
                <article class="group bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                    
                    <a href="/berita/{{ $item->slug }}" class="aspect-[16/9] mb-5 overflow-hidden rounded bg-gray-100 flex-shrink-0 block">
                        @if($item->thumbnail)
                            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="{{ asset('storage/' . $item->thumbnail) }}" alt="{{ $item->judul }}">
                        @else
                            <div class="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                                <span class="material-symbols-outlined text-4xl">image</span>
                            </div>
                        @endif
                    </a>
                    
                    <div class="space-y-2 flex flex-col flex-grow">
                        <span class="text-[10px] text-[#bc000a] font-bold uppercase tracking-wider">
                            {{ $item->kategori ?? 'Umum' }} • {{ $item->created_at->format('d M Y') }}
                        </span>
                        
                        <a href="/berita/{{ $item->slug }}" class="block">
                            <h4 class="text-lg font-bold text-[#455d97] group-hover:text-[#bc000a] transition-colors leading-tight line-clamp-2">
                                {{ $item->judul }}
                            </h4>
                        </a>
                        
                        <p class="text-sm text-gray-600 line-clamp-3 mt-2 flex-grow">
                            {{ Str::limit(strip_tags($item->isi), 120) }}
                        </p>
                    </div>
                </article>
                @empty
                <div class="col-span-1 md:col-span-3 text-center py-10">
                    <p class="text-gray-500">Belum ada berita atau pengumuman saat ini.</p>
                </div>
                @endforelse

            </div>
        </div>
    </section>
@endsection