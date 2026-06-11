<header class="sticky top-0 z-10 flex justify-between items-center h-16 md:h-20 px-4 md:px-8 bg-white/90 backdrop-blur-xl border-b border-outline">
    
    <div class="flex items-center overflow-hidden pr-4">
        
        <button onclick="toggleSidebar()" class="md:hidden mr-3 text-[#203971] focus:outline-none flex-shrink-0 flex items-center">
            <span class="material-symbols-outlined text-3xl">menu</span>
        </button>

        <div class="overflow-hidden">
            <h2 class="text-xl md:text-[32px] font-bold text-[#203971] truncate leading-tight">
                @yield('header_title', 'Dashboard')
            </h2>
            <p class="text-xs md:text-[16px] text-gray-600 truncate mt-0.5 md:mt-0">
                @yield('header_subtitle', 'Selamat Datang, ' . (Auth::user()->name ?? 'Admin'))
            </p>
        </div>
    </div>
    
    <div class="flex items-center flex-shrink-0 gap-4">
        <div class="flex items-center gap-3 pl-0 md:pl-4 border-none md:border-l md:border-outline">
            
            <div class="hidden md:block text-right">
                <p class="text-xs font-bold text-[#203971] truncate max-w-[150px]">
                    {{ Auth::user()->name ?? 'Administrator' }}
                </p>
                <p class="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Super Admin</p>
            </div>
            
            <div class="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 rounded-full bg-[#203971]/10 flex items-center justify-center border border-[#203971]/20 overflow-hidden">
                <span class="material-symbols-outlined text-[#203971] text-lg md:text-xl">person</span>
            </div>
            
        </div>
    </div>
</header>