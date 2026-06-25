import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Pagination';

interface BeritaItem {
  id: number;
  judul: string;
  slug: string;
  isi: string;
  thumbnail?: string;
  kategori?: string;
  author: string;
  created_at: string;
}

interface PaginatedBerita {
  data: BeritaItem[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  from: number | null;
  to: number | null;
  total: number;
}

interface IndexProps {
  berita: PaginatedBerita;
  totalBerita: number;
}

export default function Index({ berita, totalBerita }: IndexProps) {
  const queryParams = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(queryParams.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/admin/berita', { search }, { preserveState: true });
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      router.delete(`/admin/berita/${id}`);
    }
  };

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

  const truncateText = (htmlStr: string, limit: number = 80) => {
    const text = htmlStr.replace(/<[^>]*>/g, '');
    if (text.length > limit) {
      return text.slice(0, limit) + '...';
    }
    return text;
  };

  return (
    <AdminLayout 
      title="Manajemen Berita" 
      subtitle="Kelola publikasi berita, informasi, dan pengumuman praktikum."
    >
      <Head title="Manajemen Berita" />

      {/* Stats Overview */}
      <section className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="academic-card p-6 rounded-xl flex flex-col justify-center border border-gray-200 md:col-span-1 shadow-sm bg-white">
            <span className="font-mono text-[12px] text-gray-500 uppercase tracking-wider">Total Berita</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-bold text-[#203971]">{totalBerita}</span>
              <span className="text-gray-600 text-sm font-medium">Berita dipublikasi</span>
            </div>
          </div>
        </div>
      </section>

      {/* News Table List */}
      <section className="px-8 pb-12">
        <div className="academic-card rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          
          {/* Table Header & Actions */}
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50/50 gap-4">
            <h4 className="text-xl font-bold text-[#203971]">Daftar Berita</h4>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <form onSubmit={handleSearch} className="relative flex items-center w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 text-gray-400 text-[18px]">search</span>
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari judul berita..." 
                  className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded text-sm focus:outline-none focus:border-[#203971] focus:ring-1 focus:ring-[#203971] transition-all"
                />
              </form>

              <Link 
                href="/admin/berita/create" 
                className="bg-[#203971] text-white px-4 py-2 text-sm font-bold rounded flex items-center justify-center gap-2 hover:bg-[#152a55] transition-all whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-sm">add</span> Buat Berita
              </Link>
            </div>
          </div>

          {/* Table Data */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="font-mono text-[12px] text-gray-500 border-b border-gray-200 bg-gray-50 uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Judul Berita</th>
                  <th className="px-6 py-4 font-semibold">Penulis</th>
                  <th className="px-6 py-4 font-semibold">Kategori</th>
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {berita.data.length > 0 ? (
                  berita.data.map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 flex-shrink-0 overflow-hidden">
                            {item.thumbnail ? (
                              <img src={`/storage/${item.thumbnail}`} className="w-full h-full object-cover" alt={item.judul} />
                            ) : (
                              <img src="https://via.placeholder.com/150" className="w-full h-full object-cover" alt="Placeholder" />
                            )}
                          </div>
                          <div>
                            <div className="text-base font-bold text-[#203971]">{item.judul}</div>
                            <div className="text-sm text-gray-500 w-48 truncate">{truncateText(item.isi)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{item.author}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-50 border border-blue-200 text-[#203971] rounded-full text-xs font-mono uppercase font-semibold">
                          {item.kategori || 'Umum'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <Link 
                            href={`/admin/berita/${item.id}/edit`} 
                            className="p-2 text-gray-400 hover:text-[#203971] transition-colors bg-white border border-gray-200 rounded shadow-sm hover:shadow" 
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </Link>
                          <button 
                            onClick={() => handleDelete(item.id)} 
                            className="p-2 text-gray-400 hover:text-[#F32923] transition-colors bg-white border border-gray-200 rounded shadow-sm hover:shadow" 
                            title="Hapus"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Belum ada berita yang diterbitkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Info */}
          <div className="p-6 bg-gray-50 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 gap-4">
            {berita.from && berita.to ? (
              <span className="text-gray-500 font-mono text-[12px] uppercase tracking-wider">
                Menampilkan {berita.from}-{berita.to} dari {berita.total} Berita
              </span>
            ) : (
              <span className="text-gray-500 font-mono text-[12px] uppercase tracking-wider">
                Menampilkan 0 Berita
              </span>
            )}
            
            <Pagination links={berita.links} />
          </div>

        </div>
      </section>
    </AdminLayout>
  );
}
