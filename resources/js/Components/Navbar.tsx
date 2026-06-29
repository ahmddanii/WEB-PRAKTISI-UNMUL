import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '../types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { url } = usePage();

  const isHomePage = url === '/';

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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isHomePage && !scrolled
      ? 'bg-transparent text-white'
      : 'bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm'
  }`;

  const linkClasses = `text-base font-medium transition-colors ${
    isHomePage && !scrolled
      ? 'text-white hover:text-white/80'
      : 'text-gray-900 hover:text-gray-900/80'
  }`;

  const brandTextClasses = `font-bold tracking-tight text-xl font-['Montserrat'] ${
    isHomePage && !scrolled ? 'text-white' : 'text-primary'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="relative flex justify-between items-center h-16 px-6 md:px-8 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-3">
          <img
            alt="PRAKTISI Logo"
            className="h-9 w-auto object-contain"
            src={
              isHomePage && !scrolled
                ? '/images/praktisi_white.png'
                : '/images/logo.png'
            }
          />
          <span className={brandTextClasses}>PRAKTISI</span>
        </div>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-8 absolute left-1/2 -translate-x-1/2">
          <Link className={linkClasses} href="/">
            Beranda
          </Link>
          <Link className={linkClasses} href="/dokumen">
            Dokumen
          </Link>
          <Link className={linkClasses} href="/jadwal">
            Jadwal
          </Link>
          <Link className={linkClasses} href="/berita">
            Berita
          </Link>
          <Link className={linkClasses} href="/kontak">
            Kontak
          </Link>
          <Link className={linkClasses} href="/tentang">
            Tentang
          </Link>
        </div>

        <div className="hidden md:flex items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg transition-all duration-200 text-base font-medium focus:outline-none cursor-pointer shadow-sm hover:shadow active:scale-95 ${
                isHomePage && !scrolled
                  ? 'bg-white text-primary hover:bg-white/90'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              <span>Layanan</span>
              <span
                className={`material-symbols-outlined text-lg transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              >
                expand_more
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-gray-100 shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  href="/pengaduan"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  Pengaduan
                </Link>
                <Link
                  href="/pengajuan-surat"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  Pengajuan Surat
                </Link>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden focus:outline-none flex items-center transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          } ${isHomePage && !scrolled ? 'text-white' : 'text-primary'}`}
        >
          <span className="material-symbols-outlined text-3xl transition-all duration-300">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      <div
        className={`md:hidden absolute left-4 right-4 top-20 rounded-2xl bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-out ${
          isOpen
            ? 'max-h-[520px] opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-5 space-y-2">
          {[
            { label: 'Beranda', href: '/' },
            { label: 'Dokumen', href: '/dokumen' },
            { label: 'Jadwal', href: '/jadwal' },
            { label: 'Berita', href: '/berita' },
            { label: 'Kontak', href: '/kontak' },
            { label: 'Tentang', href: '/tentang' },
          ].map((item) => (
            <Link
              key={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                url === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className={`flex justify-between items-center w-full px-4 py-2.5 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                isMobileDropdownOpen
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
              }`}
            >
              <span>Layanan</span>
              <span
                className={`material-symbols-outlined text-lg transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
              >
                expand_more
              </span>
            </button>
            {isMobileDropdownOpen && (
              <div className="flex flex-col mt-1 ml-2 space-y-1 pl-4 border-l-2 border-primary/20">
                <Link
                  onClick={() => {
                    setIsOpen(false);
                    setIsMobileDropdownOpen(false);
                  }}
                  className="block px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                  href="/pengaduan"
                >
                  Pengaduan
                </Link>
                <Link
                  onClick={() => {
                    setIsOpen(false);
                    setIsMobileDropdownOpen(false);
                  }}
                  className="block px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
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
