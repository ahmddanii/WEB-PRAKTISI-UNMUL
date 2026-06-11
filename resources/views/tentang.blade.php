@extends('layouts.app')

@section('title', 'Tentang Kami')

@section('content')
<main class="pt-14">
    <section class="radial-gradient(circle at 50% 50%, #f3f3f4 0%, #F9F9F9 100%) bg-[#f9f9f9] mb-10">
        <div class="max-w-[1280px] mx-auto px-6 md:px-8">
            <div class="grid grid-cols-1 gap-16 items-center">
                <div class="text-center">
                    <h1 class="text-5xl md:text-6xl font-extrabold text-[#203971] mb-8 leading-[1.1]">
                        Tentang Kami
                    </h1>
                    <p class="text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl mx-auto">
                        Praktikum Sistem Informasi adalah kegiatan pendidikan yang memberikan kesempatan kepada mahasiswa untuk mempraktikkan dan mengaplikasikan teori-teori yang telah dipelajari dalam mata kuliah Sistem Informasi ke dalam situasi nyata.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <div class="h-[1px] w-full bg-gray-200 mb-5"></div>

    <section class="py-5 pb-10 bg-gray-50">
        <div class="max-w-[1280px] mx-auto px-6 md:px-8">
            
            <div class="text-center mb-12">
                <span class="font-mono text-xs font-bold text-[#455d97] uppercase tracking-widest">STRUKTUR KEPENGURUSAN</span>
                <h2 class="text-4xl font-extrabold text-[#203971] mt-2 tracking-tight">INTI PRAKTISI</h2>
                <div class="h-1 w-16 bg-[#455d97] mx-auto mt-3"></div>
            </div>

            <div class="flex flex-col items-center">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                    @forelse($pengurusInti as $pi)
                    <div class="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group bg-[#203971] hover:-translate-y-1.5 transition-all duration-300">
                        
                        @if($pi->foto)
                            <img alt="{{ $pi->nama }}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="{{ asset('storage/' . $pi->foto) }}">
                        @else
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-[#203971]">
                                <span class="material-symbols-outlined text-white/30 text-6xl">person</span>
                            </div>
                        @endif

                        <div class="absolute inset-0 bg-gradient-to-t from-[#203971] via-[#203971]/40 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-5 w-full z-10">
                            <p class="font-mono text-white text-[10px] mb-1 opacity-90 tracking-wider uppercase">{{ $pi->nama }}</p>
                            <h5 class="text-base font-bold text-white leading-tight">{{ $pi->jabatan }}</h5>
                        </div>
                    </div>
                    @empty
                    <div class="col-span-4 text-center py-10 text-gray-400 italic">Belum ada data struktur inti.</div>
                    @endforelse
                </div>

                <div class="mt-24 w-full">
                    <div class="text-center mb-12">
                        <span class="font-mono text-xs font-bold text-[#455d97] uppercase tracking-widest">KOORDINATOR</span>
                        <h2 class="text-4xl font-extrabold text-[#203971] mt-2 tracking-tight">MATA KULIAH</h2>
                        <div class="h-0.5 w-16 bg-[#455d97] mx-auto mt-2"></div>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        @forelse($koordinatorMatkul as $km)
                        <div class="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group bg-[#203971] hover:-translate-y-1.5 transition-all duration-300">
                            @if($km->foto)
                                <img alt="{{ $km->nama }}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="{{ asset('storage/' . $km->foto) }}">
                            @else
                                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-[#203971]">
                                    <span class="material-symbols-outlined text-white/30 text-5xl">person</span>
                                </div>
                            @endif

                            <div class="absolute inset-0 bg-gradient-to-t from-[#203971] via-[#203971]/60 to-transparent"></div>
                            <div class="absolute bottom-0 left-0 p-4 w-full z-10">
                                <p class="font-mono text-white text-[9px] mb-0.5 opacity-90 tracking-wider uppercase line-clamp-1">{{ $km->nama }}</p>
                                <h5 class="text-sm font-bold text-white leading-tight line-clamp-2">
                                    {{ $km->matkul->nama_mk ?? 'Mata Kuliah' }}
                                </h5>
                            </div>
                        </div>
                        @empty
                        <div class="col-span-4 text-center py-10 text-gray-400 italic">Belum ada data koordinator mata kuliah.</div>
                        @endforelse
                    </div>
                </div>

            </div>
        </div>
    </section>
</main>
@endsection