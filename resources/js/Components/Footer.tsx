import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-[#455d97] text-white py-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left mb-10 gap-8 md:gap-0">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-bold mb-2">PRAKTIKUM SISTEM INFORMASI</div>
            <p className="text-white/70 max-w-sm leading-relaxed text-sm md:text-base">
              Tempat mengakses berbagai informasi dan layanan terkait praktikum sistem informasi dengan mudah dan cepat.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <a 
              href="https://www.instagram.com/praktisi.unmul/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">photo_camera</span>
              <span className="font-medium text-sm">Instagram</span>
            </a>

            <Link href="/login" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">login</span>
              <span className="font-medium text-sm">Login</span>
            </Link>
          </div>

        </div>
        
        <div className="flex flex-col items-center pt-6 border-t border-white/10 justify-center text-center">
          <p className="text-white/50 text-xs md:text-sm">© 2026 PRAKTISI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
