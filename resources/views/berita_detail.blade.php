@extends('layouts.app')

@section('title', $berita->judul)

@section('content')
<main class="pt-4 pb-0 bg-white flex-grow">
    <article class="max-w-[800px] mx-auto px-6 md:px-8">
        
        <a href="/" class="inline-flex items-center gap-2 text-sm font-bold text-[#455d97] hover:text-[#bc000a] transition-colors mb-10">
            <span class="material-symbols-outlined text-sm">arrow_back</span> Kembali ke Beranda
        </a>

        <header class="mb-8">
            <div class="flex items-center gap-3 mb-5">
                <span class="px-4 py-1.5 bg-[#455d97]/10 text-[#455d97] rounded-full text-xs font-bold uppercase tracking-wider">
                    {{ $berita->kategori ?? 'Umum' }}
                </span>
                <span class="text-sm text-gray-500 font-medium">
                    {{ $berita->created_at->format('d M Y') }}
                </span>
            </div>
            
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#203971] leading-tight mb-8">
                {{ $berita->judul }}
            </h1>
            
            <div class="flex items-center gap-4 text-gray-600 border-y border-gray-100 py-5 mb-8 bg-gray-50/50 px-4 rounded-lg">
                <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                    <span class="material-symbols-outlined text-gray-400 text-xl">person</span>
                </div>
                <div>
                    <p class="text-base font-bold text-gray-800">{{ $berita->author }}</p>
                    <p class="text-xs text-gray-500 uppercase tracking-widest mt-0.5">Penulis Artikel</p>
                </div>
            </div>
        </header>

        @if($berita->thumbnail)
        <figure class="w-full mb-12 rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-gray-50">
            <img src="{{ asset('storage/' . $berita->thumbnail) }}" alt="{{ $berita->judul }}" class="w-full h-auto max-h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700">
        </figure>
        @endif

        <div class="text-lg text-gray-700 leading-loose whitespace-pre-wrap text-justify pb-10">
            {{ $berita->isi }}
        </div>
        
    </article>
</main>
@endsection