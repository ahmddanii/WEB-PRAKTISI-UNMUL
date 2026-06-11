@extends('layouts.app')

@section('title', 'Kontak Kami')

@section('content')
<main class="py-14 px-6 md:px-8 max-w-[1280px] mx-auto min-h-[80vh]">
    
    <section class="mb-10">
        <h1 class="text-4xl md:text-5xl font-bold text-[#455d97] mb-4 tracking-tight">Kontak kami</h1>
        <p class="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Jangan ragu untuk menghubungi kami melalui saluran yang tersedia.
        </p>
    </section>
    <div class="h-[1px] w-full bg-gray-200 mb-10"></div>

    <div class="sosmed-container max-w-[1024px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div class="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group" style="background-color: #203971;">
                <div class="relative z-10">
                    <h3 class="text-xl font-bold mb-1.5">Chat Kami di Instagram</h3>
                    <p class="text-white/80 text-sm">Ikuti dan kirim pesan langsung ke akun Instagram kami</p>
                </div>
                <div class="mt-5 relative z-10">
                    <a href="https://www.instagram.com/praktisi.unmul/" class="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide">
                        Pergi ke Instagram <span class="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                    </a>
                </div>
                <span class="material-symbols-outlined absolute -bottom-2 -right-2 text-[90px] text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500">alternate_email</span>
            </div>

            <div class="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group" style="background-color: #e53935;">
                <div class="relative z-10">
                    <h3 class="text-xl font-bold mb-1.5">Form Pengaduan</h3>
                    <p class="text-white/80 text-sm">Tempat untuk mengirimkan pengaduan atau masukan terkait praktikum</p>
                </div>
                <div class="mt-5 relative z-10">
                    <span class="inline-flex items-center gap-2 bg-black/20 hover:bg-black/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide">
                        Form sudah ditutup <span class="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                    </span>
                </div>
                <span class="material-symbols-outlined absolute -bottom-2 -right-2 text-[90px] text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-500">mail</span>
            </div>

            <div class="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group" style="background-color: #37474f;">
                <div class="relative z-10">
                    <h3 class="text-xl font-bold mb-1.5">Kunjungi GitHub</h3>
                    <p class="text-white/80 text-sm">Lihat source code, dokumentasi, dan proyek kami di GitHub</p>
                </div>
                <div class="mt-5 relative z-10">
                    <span class="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide">
                        Coming soon <span class="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                    </span>
                </div>
                <span class="material-symbols-outlined absolute -bottom-2 -right-2 text-[90px] text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500">code</span>
            </div>

            <div class="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group" style="background-color: #5865F2;">
                <div class="relative z-10">
                    <h3 class="text-xl font-bold mb-1.5">Gabung Server Discord</h3>
                    <p class="text-white/80 text-sm">Bergabung dengan komunitas kami di Discord untuk berdiskusi.</p>
                </div>
                <div class="mt-5 relative z-10">
                    <span class="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide">
                        Coming soon <span class="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                    </span>
                </div>
                <span class="material-symbols-outlined absolute -bottom-2 -right-2 text-[90px] text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-500">forum</span>
            </div>

        </div>
    </div>
    </main>
@endsection