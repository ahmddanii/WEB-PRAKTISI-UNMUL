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
                  <div key={pi.id} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group bg-[#203971] hover:-translate-y-1.5 transition-all duration-300">
                    {pi.foto ? (
                      <img 
                        alt={pi.nama} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        src={`/storage/${pi.foto}`} 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-[#203971]">
                        <span className="material-symbols-outlined text-white/30 text-6xl">person</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#203971] via-[#203971]/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-5 w-full z-10">
                      <p className="font-mono text-white text-[10px] mb-1 opacity-90 tracking-wider uppercase">{pi.nama}</p>
                      <h5 className="text-base font-bold text-white leading-tight">{pi.jabatan}</h5>
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
                    <div key={km.id} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group bg-[#203971] hover:-translate-y-1.5 transition-all duration-300">
                      {km.foto ? (
                        <img 
                          alt={km.nama} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          src={`/storage/${km.foto}`} 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-[#203971]">
                          <span className="material-symbols-outlined text-white/30 text-5xl">person</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#203971] via-[#203971]/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 w-full z-10">
                        <p className="font-mono text-white text-[9px] mb-0.5 opacity-90 tracking-wider uppercase line-clamp-1">{km.nama}</p>
                        <h5 className="text-sm font-bold text-white leading-tight line-clamp-2">
                          {km.matkul?.nama_mk ?? 'Mata Kuliah'}
                        </h5>
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
