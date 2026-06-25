import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { url } = usePage();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/logout');
  };

  const isActive = (path: string) => {
    if (path === '/admin/dashboard') {
      return url === '/admin/dashboard';
    }
    return url.startsWith(path);
  };

  return (
    <>
      {/* Overlay for Mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`} 
        onClick={onClose}
      />

      <aside 
        className={`fixed left-0 top-0 h-full w-64 bg-[#203971] flex flex-col p-4 space-y-4 z-50 transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <button 
          onClick={onClose} 
          className="md:hidden absolute top-6 right-4 text-white/70 hover:text-white focus:outline-none"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>

        <div className="px-4 py-8">
          <h1 className="text-[24px] font-semibold text-white tracking-tight">PRAKTISI UNMUL</h1>
          <p className="text-[12px] text-white/60 mt-2 font-mono">Admin Portal</p>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
          <Link 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/admin/dashboard') 
                ? 'bg-white text-[#203971] font-bold shadow-sm' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`} 
            href="/admin/dashboard"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[16px]">Dashboard</span>
          </Link>
          <Link 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/admin/berita') 
                ? 'bg-white text-[#203971] font-bold shadow-sm' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`} 
            href="/admin/berita"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">newspaper</span>
            <span className="text-[16px]">Manajemen Berita</span>
          </Link>
          <Link 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/admin/jadwal') 
                ? 'bg-white text-[#203971] font-bold shadow-sm' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`} 
            href="/admin/jadwal"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-[16px]">Manajemen Jadwal</span>
          </Link>
          <Link 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/admin/pengurus') 
                ? 'bg-white text-[#203971] font-bold shadow-sm' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`} 
            href="/admin/pengurus"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">group</span>
            <span className="text-[16px]">Pengurus & Koor</span>
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-white/10">
          <form onSubmit={handleLogout}>
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-[#203971] font-bold rounded-lg hover:bg-red-600 hover:text-white transition-colors shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
