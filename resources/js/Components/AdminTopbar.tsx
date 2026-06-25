import React from 'react';
import { usePage } from '@inertiajs/react';

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  onOpenSidebar: () => void;
}

export default function AdminTopbar({ title, subtitle, onOpenSidebar }: AdminTopbarProps) {
  const { props } = usePage();
  const auth = props.auth as { user: { name: string; username: string; email: string } | null };
  const user = auth.user;

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center h-16 md:h-20 px-4 md:px-8 bg-white/90 backdrop-blur-xl border-b border-outline">
      
      <div className="flex items-center overflow-hidden pr-4">
        
        <button 
          onClick={onOpenSidebar}
          className="md:hidden mr-3 text-[#203971] focus:outline-none flex-shrink-0 flex items-center"
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>

        <div className="overflow-hidden">
          <h2 className="text-xl md:text-[32px] font-bold text-[#203971] truncate leading-tight">
            {title}
          </h2>
          <p className="text-xs md:text-[16px] text-gray-600 truncate mt-0.5 md:mt-0">
            {subtitle || `Selamat Datang, ${user?.name || 'Admin'}`}
          </p>
        </div>
      </div>
      
      <div className="flex items-center flex-shrink-0 gap-4">
        <div className="flex items-center gap-3 pl-0 md:pl-4 border-none md:border-l md:border-outline">
          
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-[#203971] truncate max-w-[150px]">
              {user?.name || 'Administrator'}
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Super Admin</p>
          </div>
          
          <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 rounded-full bg-[#203971]/10 flex items-center justify-center border border-[#203971]/20 overflow-hidden">
            <span className="material-symbols-outlined text-[#203971] text-lg md:text-xl">person</span>
          </div>
          
        </div>
      </div>
    </header>
  );
}
