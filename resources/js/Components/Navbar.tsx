import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="flex justify-between items-center h-16 px-6 md:px-8 max-w-[1280px] mx-auto">
        
        <div className="flex items-center gap-3">
          <img alt="PRAKTISI Logo" className="h-9 w-auto object-contain" src="/images/logo.png" />
          <span className="font-bold text-primary tracking-tight text-xl">PRAKTISI</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/">Beranda</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/dokumen">Dokumen</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/jadwal">Jadwal</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/berita">Berita</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/pengajuan-surat">Pengajuan Surat</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/pengaduan">Pengaduan</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/kontak">Kontak</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/tentang">Tentang</Link>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-primary focus:outline-none flex items-center"
        >
          <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
        </button>
        
      </div>

      <div className={`md:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full left-0 top-16 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col px-6 py-4 space-y-4">
          <Link onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/">Beranda</Link>
          <Link onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/dokumen">Dokumen</Link>
          <Link onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/jadwal">Jadwal</Link>
          <Link onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/berita">Berita</Link>
          <Link onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/pengajuan-surat">Pengajuan Surat</Link>
          <Link onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/pengaduan">Pengaduan</Link>
          <Link onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/kontak">Kontak</Link>
          <Link onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-base font-medium" href="/tentang">Tentang</Link>
        </div>
      </div>
    </nav>
  );
}
