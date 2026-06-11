<nav class="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant shadow-md transition-all duration-300">
    <div class="flex justify-between items-center h-16 px-6 md:px-8 max-w-[1280px] mx-auto">
        
        <div class="flex items-center gap-3">
            <img alt="PRAKTISI Logo" class="h-9 w-auto object-contain" src="{{ asset('images/logo.png') }}">
            <span class="font-bold text-primary tracking-tight text-xl">PRAKTISI</span>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/">Beranda</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/dokumen">Dokumen</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="{{ route('jadwal') }}">Jadwal</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/berita">Berita</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/kontak">Kontak</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/tentang">Tentang</a>
        </div>

        <button id="mobile-menu-btn" class="md:hidden text-primary focus:outline-none flex items-center">
            <span class="material-symbols-outlined text-3xl">menu</span>
        </button>
        
    </div>

    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full left-0 top-16">
        <div class="flex flex-col px-6 py-4 space-y-4">
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/">Beranda</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/dokumen">Dokumen</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/jadwal">Jadwal</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/berita">Berita</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/kontak">Kontak</a>
            <a class="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/tentang">Tentang</a>
        </div>
    </div>
</nav>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    });
</script>