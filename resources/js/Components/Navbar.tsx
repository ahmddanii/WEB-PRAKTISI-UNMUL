import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="relative flex justify-between items-center h-16 px-6 md:px-8 max-w-[1280px] mx-auto">

        <div className="flex items-center gap-3">
          <img alt="PRAKTISI Logo" className="h-9 w-auto object-contain" src="/images/logo.png" />
          <span className="font-semibold text-[#203971] tracking-tight text-xl font-['Montserrat']">PRAKTISI</span>
        </div>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-8 absolute left-1/2 -translate-x-1/2">
          <Link className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/">Beranda</Link>
          <Link className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/dokumen">Dokumen</Link>
          <Link className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/jadwal">Jadwal</Link>
          <Link className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/berita">Berita</Link>
          <Link className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/kontak">Kontak</Link>
          <Link className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/tentang">Tentang</Link>
        </div>

        <div className="hidden md:flex items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 bg-[#203971] text-white hover:bg-[#203971]/90 px-3.5 py-1.5 rounded-lg transition-all duration-200 text-base font-medium focus:outline-none cursor-pointer shadow-sm hover:shadow active:scale-95"
            >
              <span>Layanan</span>
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-gray-100 shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  href="/pengaduan"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-[#0d1730] hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  Pengaduan
                </Link>
                <Link
                  href="/pengajuan-surat"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-[#0d1730] hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  Pengajuan Surat
                </Link>
              </div>
            )}
          </div>
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
          <Link onClick={() => setIsOpen(false)} className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/">Beranda</Link>
          <Link onClick={() => setIsOpen(false)} className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/dokumen">Dokumen</Link>
          <Link onClick={() => setIsOpen(false)} className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/jadwal">Jadwal</Link>
          <Link onClick={() => setIsOpen(false)} className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/berita">Berita</Link>
          <Link onClick={() => setIsOpen(false)} className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/kontak">Kontak</Link>
          <Link onClick={() => setIsOpen(false)} className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium" href="/tentang">Tentang</Link>
          
          <div className="flex flex-col">
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="flex justify-between items-center bg-[#203971] text-white hover:bg-[#203971]/90 px-4 py-2 rounded-lg text-base font-medium w-full text-left focus:outline-none shadow-sm cursor-pointer"
            >
              <span>Layanan</span>
              <span className={`material-symbols-outlined transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            {isMobileDropdownOpen && (
              <div className="flex flex-col pl-4 space-y-3 border-l-2 border-[#203971]/20 mt-2">
                <Link
                  onClick={() => { setIsOpen(false); setIsMobileDropdownOpen(false); }}
                  className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium py-1"
                  href="/pengaduan"
                >
                  Pengaduan
                </Link>
                <Link
                  onClick={() => { setIsOpen(false); setIsMobileDropdownOpen(false); }}
                  className="text-[#0d1730] hover:text-[#0d1730]/80 transition-colors text-base font-medium py-1"
                  href="/pengajuan-surat"
                >
                  Pengajuan Surat
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
