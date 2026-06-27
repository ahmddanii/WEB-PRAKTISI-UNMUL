import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

interface PengurusInti {
  id: number;
  nama: string;
  nim_nip?: string;
  jabatan: string;
  foto?: string;
  email?: string;
  no_hp?: string;
  urutan: number;
}

interface KoordinatorMatkul {
  id: number;
  nama: string;
  nim?: string;
  foto?: string;
  email?: string;
  no_hp?: string;
  matkul?: {
    id: number;
    nama_mk: string;
  };
}

interface TentangProps {
  pengurusInti: PengurusInti[];
  koordinatorMatkul: KoordinatorMatkul[];
}

export default function Tentang({ pengurusInti, koordinatorMatkul }: TentangProps) {
  return (
    <AppLayout>
      <Head title="Tentang Kami" />

      <section className="radial-gradient(circle at 50% 50%, #f3f3f4 0%, #F9F9F9 100%) bg-[#f9f9f9] mb-10 pt-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 gap-16 items-center">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#203971] mb-8 leading-[1.1]">
                Tentang Kami
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl mx-auto">
                Praktikum Sistem Informasi adalah kegiatan pendidikan yang memberikan kesempatan kepada mahasiswa untuk mempraktikkan dan mengaplikasikan teori-teori yang telah dipelajari dalam mata kuliah Sistem Informasi ke dalam situasi nyata.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[1px] w-full bg-gray-200 mb-5"></div>

      <section className="py-5 pb-10 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">

          <div className="text-center mb-12">
            <span className="font-mono text-xs font-bold text-[#455d97] uppercase tracking-widest">STRUKTUR KEPENGURUSAN</span>
            <h2 className="text-4xl font-extrabold text-[#203971] mt-2 tracking-tight">INTI PRAKTISI</h2>
            <div className="h-1 w-16 bg-[#455d97] mx-auto mt-3"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {pengurusInti.length > 0 ? (
                pengurusInti.map((pi) => (
                  <div
                    key={pi.id}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#203971]/10 transition-all duration-500 hover:-translate-y-1.5 cursor-default bg-gradient-to-br from-[#203971] to-[#121c38]"
                  >
                    {/* Background watermark logo (left and right) */}
                    <div className="absolute top-8 left-[-24px] pointer-events-none opacity-[0.05] transition-all duration-700 group-hover:scale-110 rotate-[-15deg] group-hover:rotate-[-20deg]">
                      <img src="/images/logo.png" className="w-50 h-50 object-contain filter brightness-0 invert" alt="" />
                    </div>
                    <div className="absolute top-8 right-[-24px] pointer-events-none opacity-[0.05] transition-all duration-700 group-hover:scale-110 rotate-[15deg] group-hover:rotate-[20deg]">
                      <img src="/images/logo_clean.png" className="w-50 h-50 object-contain filter brightness-0 invert" alt="" />
                    </div>

                    {/* Photo */}
                    {pi.foto ? (
                      <img
                        alt={pi.nama}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={`/storage/${pi.foto}`}
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e8ecf3] to-[#d5dbe8]">
                        <div className="w-20 h-20 rounded-full bg-white/60 border-2 border-[#203971]/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#203971]/30 text-5xl">person</span>
                        </div>
                      </div>
                    )}

                    {/* Gradient overlay - always visible, seamless */}
                    <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#0f1d3d] via-[#0f1d3d]/60 to-transparent pointer-events-none" />

                    {/* Logo badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-sm border border-gray-200/50 rounded-lg py-1 px-2 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                        <img src="/images/logo.png" className="h-4 w-auto object-contain" alt="Praktisi Unmul" />
                        <span className="text-[9px] font-bold text-[#203971] tracking-wider font-mono">PRAKTISI</span>
                      </div>
                    </div>

                    {/* Accent line top */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#203971] via-[#86DFCA] to-[#203971] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    {/* Info - overlaid at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest font-mono mb-0.5">
                        {pi.nim_nip || '-'}
                      </p>
                      <h3 className="text-sm font-extrabold text-white leading-tight mb-1">
                        {pi.nama}
                      </h3>
                      <p className="text-xs text-white/60 font-medium leading-snug">
                        {pi.jabatan}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center py-10 text-gray-400 italic">Belum ada data struktur inti.</div>
              )}
            </div>

            <div className="mt-24 w-full">
              <div className="text-center mb-12">
                <span className="font-mono text-xs font-bold text-[#455d97] uppercase tracking-widest">KOORDINATOR</span>
                <h2 className="text-4xl font-extrabold text-[#203971] mt-2 tracking-tight">MATA KULIAH</h2>
                <div className="h-0.5 w-16 bg-[#455d97] mx-auto mt-2"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {koordinatorMatkul.length > 0 ? (
                  koordinatorMatkul.map((km) => (
                    <div
                      key={km.id}
                      className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#203971]/10 transition-all duration-500 hover:-translate-y-1.5 cursor-default bg-gradient-to-br from-[#203971] to-[#121c38]"
                    >
                      {/* Background watermark logo (left and right) */}
                      <div className="absolute top-8 left-[-24px] pointer-events-none opacity-[0.05] transition-all duration-700 group-hover:scale-110 rotate-[-15deg] group-hover:rotate-[-20deg]">
                        <img src="/images/logo.png" className="w-36 h-36 object-contain filter brightness-0 invert" alt="" />
                      </div>
                      <div className="absolute top-8 right-[-24px] pointer-events-none opacity-[0.05] transition-all duration-700 group-hover:scale-110 rotate-[15deg] group-hover:rotate-[20deg]">
                        <img src="/images/logo_clean.png" className="w-36 h-36 object-contain filter brightness-0 invert" alt="" />
                      </div>

                      {/* Photo */}
                      {km.foto ? (
                        <img
                          alt={km.nama}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          src={`/storage/${km.foto}`}
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e8ecf3] to-[#d5dbe8]">
                          <div className="w-20 h-20 rounded-full bg-white/60 border-2 border-[#203971]/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#203971]/30 text-4xl">person</span>
                          </div>
                        </div>
                      )}

                      {/* Gradient overlay - always visible, seamless */}
                      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#0f1d3d] via-[#0f1d3d]/60 to-transparent pointer-events-none" />

                      {/* Logo badge */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-sm border border-gray-200/50 rounded-lg py-1 px-2 shadow-sm group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                          <img src="/images/logo.png" className="h-4 w-auto object-contain" alt="Praktisi Unmul" />
                          <span className="text-[9px] font-bold text-[#203971] tracking-wider font-mono">PRAKTISI</span>
                        </div>
                      </div>

                      {/* Accent line top */}
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#203971] via-[#86DFCA] to-[#203971] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      {/* Info - overlaid at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <div className="inline-block bg-white/10 rounded-full px-2 py-0.5 mb-1.5">
                          <p className="text-[9px] font-bold text-white/60 uppercase tracking-wider font-mono line-clamp-1">
                            {km.matkul?.nama_mk ?? 'Mata Kuliah'}
                          </p>
                        </div>
                        <h3 className="text-sm font-extrabold text-white leading-tight mb-0.5">
                          {km.nama}
                        </h3>
                        <p className="text-[10px] text-white/40 font-mono tracking-wider">
                          {km.nim || '-'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-10 text-gray-400 italic">Belum ada data koordinator mata kuliah.</div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </AppLayout>
  );
}
