import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Kontak({
  isPengaduanOpen = true,
}: {
  isPengaduanOpen?: boolean;
}) {
  return (
    <AppLayout>
      <Head title="Kontak Kami" />

      <main className="py-14 px-6 md:px-8 max-w-[1280px] mx-auto min-h-[80vh]">
        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-light mb-4 tracking-tight">
            Kontak kami
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Jangan ragu untuk menghubungi kami melalui saluran yang tersedia.
          </p>
        </section>

        <div className="h-[1px] w-full bg-gray-200 mb-10"></div>

        <div className="sosmed-container max-w-[1024px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group bg-primary">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1.5">
                  Chat Kami di Instagram
                </h3>
                <p className="text-white/80 text-sm">
                  Ikuti dan kirim pesan langsung ke akun Instagram kami
                </p>
              </div>
              <div className="mt-5 relative z-10">
                <a
                  href="https://www.instagram.com/praktisi.unmul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide"
                >
                  Pergi ke Instagram{' '}
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    north_east
                  </span>
                </a>
              </div>
              {/* Instagram Logo SVG */}
              <svg
                className="absolute -bottom-3 -right-3 w-28 h-28 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>

            <div className="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group bg-error">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1.5">Form Pengaduan</h3>
                <p className="text-white/80 text-sm">
                  Tempat untuk mengirimkan pengaduan atau masukan terkait
                  praktikum
                </p>
              </div>
              <div className="mt-5 relative z-10">
                {isPengaduanOpen ? (
                  <Link
                    href="/pengaduan"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide"
                  >
                    Buka Form Pengaduan{' '}
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      north_east
                    </span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide cursor-not-allowed">
                    Form sudah ditutup{' '}
                    <span className="material-symbols-outlined text-sm">
                      lock
                    </span>
                  </span>
                )}
              </div>
              {/* Praktisi Logo */}
              <img
                src="/images/praktisi_white.png"
                alt=""
                className="absolute -bottom-20 -right-10 w-56 h-56 object-contain opacity-10 -rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none"
              />
            </div>

            <div className="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group bg-gray-700">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1.5">Kunjungi GitHub</h3>
                <p className="text-white/80 text-sm">
                  Lihat source code, dokumentasi, dan proyek kami di GitHub
                </p>
              </div>
              <div className="mt-5 relative z-10">
                <div className="mt-5 relative z-10">
                  <a
                    href="https://github.com/Praktikum-Sistem-Informasi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide"
                  >
                    Kunjungi GitHub{' '}
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      north_east
                    </span>
                  </a>
                </div>
              </div>
              {/* GitHub Logo SVG */}
              <svg
                className="absolute -bottom-3 -right-3 w-28 h-28 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </div>

            <div className="rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group bg-indigo-600">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1.5">
                  Gabung Server Discord
                </h3>
                <p className="text-white/80 text-sm">
                  Bergabung dengan komunitas kami di Discord untuk berdiskusi.
                </p>
              </div>
              <div className="mt-5 relative z-10">
                <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-5 py-2 rounded-lg font-bold text-xs tracking-wide">
                  Coming soon{' '}
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    north_east
                  </span>
                </span>
              </div>
              {/* Discord Logo SVG */}
              <svg
                className="absolute -bottom-3 -right-3 w-28 h-28 opacity-10 -rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
