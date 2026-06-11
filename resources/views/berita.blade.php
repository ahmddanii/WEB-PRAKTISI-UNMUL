@extends('layouts.app')

@section('title', 'Berita & Pengumuman')

@section('content')
<style>
    .article-card:hover .article-image {
        filter: grayscale(0%) brightness(100%);
    }
    .article-image {
        filter: grayscale(20%) brightness(95%);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
</style>

<main class="py-16 px-6 md:px-8 max-w-[1280px] mx-auto min-h-[80vh]">
    <header class="mb-10">
        <div class="flex flex-col md:flex-row justify-between items-end mb-8 gap-8">
            <div class="max-w-2xl">
                <h1 class="text-4xl md:text-5xl font-bold text-[#455d97] mb-2 tracking-tight leading-tight">
                    Berita & Pengumuman
                </h1>
                <p class="text-lg text-gray-600">
                    Temukan update kegiatan, inovasi, dan pengumuman penting terkait praktikum.
                </p>
            </div>
        </div>
        <div class="h-[1px] w-full bg-gray-200 mt-8"></div>
    </header>

    <section class="mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            
            @forelse ($semuaBerita as $item)
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

        @if ($semuaBerita->hasPages())
        <div class="mt-16 flex justify-center">
            {{ $semuaBerita->links() }}
        </div>
        @endif
    </section>
</main>

<script>
    // Interaksi ringan untuk efek mengambang (Hover)
    document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
</script>
@endsection