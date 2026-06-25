import React, { useState, useEffect, ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import AdminSidebar from '../Components/AdminSidebar';
import AdminTopbar from '../Components/AdminTopbar';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { props } = usePage();
  const flash = props.flash as { success: string | null; error: string | null };

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (flash?.success) {
      setNotification({ type: 'success', message: flash.success });
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    } else if (flash?.error) {
      setNotification({ type: 'error', message: flash.error });
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <div className="min-h-screen overflow-hidden bg-white flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <AdminTopbar 
          title={title} 
          subtitle={subtitle} 
          onOpenSidebar={() => setSidebarOpen(true)} 
        />

        {/* Banners/Toasts */}
        {notification && (
          <div className="px-6 md:px-8 pt-4">
            <div className={`p-4 rounded-xl flex items-center justify-between shadow-sm text-white ${
              notification.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
            }`}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">
                  {notification.type === 'success' ? 'check_circle' : 'error'}
                </span>
                <span className="text-sm font-semibold">{notification.message}</span>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="hover:opacity-80 focus:outline-none"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <main className="flex-1 pb-10 overflow-y-auto custom-scrollbar bg-[#f9f9f9] transition-all duration-300 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
