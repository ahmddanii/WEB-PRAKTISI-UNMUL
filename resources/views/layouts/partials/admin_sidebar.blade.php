<div id="sidebarOverlay" class="fixed inset-0 bg-black/50 z-40 hidden md:hidden transition-opacity" onclick="toggleSidebar()"></div>

<aside id="sidebar" class="fixed left-0 top-0 h-full w-64 bg-[#203971] flex flex-col p-4 space-y-4 z-50 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none">
    
    <button onclick="toggleSidebar()" class="md:hidden absolute top-6 right-4 text-white/70 hover:text-white focus:outline-none">
        <span class="material-symbols-outlined text-3xl">close</span>
    </button>

    <div class="px-4 py-8">
        <h1 class="text-[24px] font-semibold text-white tracking-tight">PRAKTISI UNMUL</h1>
        <p class="text-[12px] text-white/60 mt-2 font-mono">Admin Portal</p>
    </div>
    
    <nav class="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ Request::is('admin/dashboard') ? 'bg-white text-[#203971] font-bold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/10' }}" href="/admin/dashboard">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="text-[16px]">Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ Request::is('admin/berita*') ? 'bg-white text-[#203971] font-bold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/10' }}" href="/admin/berita">
            <span class="material-symbols-outlined">newspaper</span>
            <span class="text-[16px]">Manajemen Berita</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ Request::is('admin/jadwal*') ? 'bg-white text-[#203971] font-bold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/10' }}" href="/admin/jadwal">
            <span class="material-symbols-outlined">calendar_month</span>
            <span class="text-[16px]">Manajemen Jadwal</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors {{ Request::is('admin/pengurus*') ? 'bg-white text-[#203971] font-bold shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/10' }}" href="{{ route('pengurus.index') }}">
            <span class="material-symbols-outlined">group</span>
            <span class="text-[16px]">Pengurus & Koordinator</span>
        </a>
    </nav>

    <div class="mt-auto pt-4 border-t border-white/10">
        <form method="POST" action="/logout">
            @csrf
            <button type="submit" class="w-full flex items-center justify-center gap-2 py-3 bg-white text-[#203971] font-bold rounded-lg hover:bg-red-600 hover:text-white transition-colors shadow-sm">
                <span class="material-symbols-outlined">logout</span>
                <span>Log Out</span>
            </button>
        </form>
    </div>
</aside>

<script>
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        // Geser sidebar masuk/keluar layar
        sidebar.classList.toggle('-translate-x-full');
        
        // Tampilkan/Sembunyikan background gelap
        overlay.classList.toggle('hidden');
    }
</script>