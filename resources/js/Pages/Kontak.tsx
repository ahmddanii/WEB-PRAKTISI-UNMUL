import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Kontak() {
  return (
    <AppLayout>
      <Head title="Kontak Kami" />

      <main className="py-14 px-6 md:px-8 max-w-[1280px] mx-auto min-h-[80vh]">
        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#455d97] mb-4 tracking-tight">Kontak kami</h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Jangan ragu untuk menghubungi kami melalui saluran yang tersedia.
          </p>
        </section>
        
        <div className="h-[1px] w-full bg-gray-200 mb-10"></div>

        <div className="sosmed-container max-w-[1024px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group" style={{ backgroundColor: '#203971' }}>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1.5">Chat Kami di Instagram</h3>
                <p className="text-white/80 text-sm">Ikuti dan kirim pesan langsung ke akun Instagram kami</p>
              </div>
              <div className="mt-5 relative z-10">
                <a 
                  href="https://www.instagram.com/praktisi.unmul/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide"
                >
                  Pergi ke Instagram <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                </a>
              </div>
              <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-[90px] text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500">alternate_email</span>
            </div>

            <div className="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group" style={{ backgroundColor: '#e53935' }}>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1.5">Form Pengaduan</h3>
                <p className="text-white/80 text-sm">Tempat untuk mengirimkan pengaduan atau masukan terkait praktikum</p>
              </div>
              <div className="mt-5 relative z-10">
                <span className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide">
                  Form sudah ditutup <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                </span>
              </div>
              <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-[90px] text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-500">mail</span>
            </div>

            <div className="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group" style={{ backgroundColor: '#37474f' }}>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1.5">Kunjungi GitHub</h3>
                <p className="text-white/80 text-sm">Lihat source code, dokumentasi, dan proyek kami di GitHub</p>
              </div>
              <div className="mt-5 relative z-10">
                <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide">
                  Coming soon <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                </span>
              </div>
              <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-[90px] text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500">code</span>
            </div>

            <div className="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group" style={{ backgroundColor: '#5865F2' }}>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1.5">Gabung Server Discord</h3>
                <p className="text-white/80 text-sm">Bergabung dengan komunitas kami di Discord untuk berdiskusi.</p>
              </div>
              <div className="mt-5 relative z-10">
                <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide">
                  Coming soon <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                </span>
              </div>
              <span className="material-symbols-outlined absolute -bottom-2 -right-2 text-[90px] text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-500">forum</span>
            </div>

          </div>
        </div>
      </main>
    </AppLayout>
  );
}
