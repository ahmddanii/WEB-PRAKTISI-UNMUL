import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import Pagination from '../Components/Pagination';
import { Berita, PaginatedResponse } from '../types';
import { formatDate, truncateText } from '../utils';

interface BeritaProps {
  semuaBerita: PaginatedResponse<Berita>;
}

export default function Berita({ semuaBerita }: BeritaProps) {
  return (
    <AppLayout>
      <Head title="Berita & Pengumuman" />

      <main className="py-16 px-6 md:px-8 max-w-[1280px] mx-auto min-h-[80vh]">
        <header className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-[#455d97] mb-2 tracking-tight leading-tight">
                Berita & Pengumuman
              </h1>
              <p className="text-lg text-gray-600">
                Temukan update kegiatan, inovasi, dan pengumuman penting terkait
                praktikum.
              </p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-200 mt-8"></div>
        </header>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {semuaBerita.data.length > 0 ? (
              semuaBerita.data.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 flex flex-col h-full"
                >
                  <Link
                    href={`/berita/${item.slug}`}
                    className="aspect-[16/9] mb-5 overflow-hidden rounded bg-gray-100 flex-shrink-0 block"
                  >
                    {item.thumbnail ? (
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={`/storage/${item.thumbnail}`}
                        alt={item.judul}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                        <span className="material-symbols-outlined text-4xl">
                          image
                        </span>
                      </div>
                    )}
                  </Link>

                  <div className="space-y-2 flex flex-col flex-grow">
                    <span className="text-[10px] text-[#bc000a] font-bold uppercase tracking-wider">
                      {item.kategori || 'Umum'} • {formatDate(item.created_at)}
                    </span>

                    <Link href={`/berita/${item.slug}`} className="block">
                      <h4 className="text-lg font-bold text-[#455d97] group-hover:text-[#bc000a] transition-colors leading-tight line-clamp-2">
                        {item.judul}
                      </h4>
                    </Link>

                    <p className="text-sm text-gray-600 line-clamp-3 mt-2 flex-grow">
                      {truncateText(item.isi)}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 text-center py-10">
                <p className="text-gray-500">
                  Belum ada berita atau pengumuman saat ini.
                </p>
              </div>
            )}
          </div>

          <div className="mt-16 flex justify-center">
            <Pagination links={semuaBerita.links} />
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
