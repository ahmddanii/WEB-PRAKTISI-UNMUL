import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

interface Berita {
  id: number;
  judul: string;
  slug: string;
  isi: string;
  thumbnail?: string;
  kategori?: string;
  author?: string;
  created_at: string;
}

interface BeritaDetailProps {
  berita: Berita;
}

export default function BeritaDetail({ berita }: BeritaDetailProps) {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <AppLayout>
      <Head title={berita.judul} />

      <main className="pt-4 pb-0 bg-white flex-grow">
        <article className="max-w-[800px] mx-auto px-6 md:px-8">
          
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#455d97] hover:text-[#bc000a] transition-colors mb-10">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Kembali ke Beranda
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-4 py-1.5 bg-[#455d97]/10 text-[#455d97] rounded-full text-xs font-bold uppercase tracking-wider">
                {berita.kategori || 'Umum'}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                {formatDate(berita.created_at)}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#203971] leading-tight mb-8">
              {berita.judul}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-600 border-y border-gray-100 py-5 mb-8 bg-gray-50/50 px-4 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                <span className="material-symbols-outlined text-gray-400 text-xl">person</span>
              </div>
              <div>
                <p className="text-base font-bold text-gray-800">{berita.author || 'Admin'}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">Penulis Artikel</p>
              </div>
            </div>
          </header>

          {berita.thumbnail && (
            <figure className="w-full mb-12 rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-gray-50">
              <img 
                src={`/storage/${berita.thumbnail}`} 
                alt={berita.judul} 
                className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700" 
              />
            </figure>
          )}

          <div 
            className="text-lg text-gray-700 leading-loose whitespace-pre-wrap text-justify pb-10"
            dangerouslySetInnerHTML={{ __html: berita.isi }}
          />
          
        </article>
      </main>
    </AppLayout>
  );
}
