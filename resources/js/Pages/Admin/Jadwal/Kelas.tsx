import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface KelasItem {
  id: number;
  kelas: string;
  angkatan: number;
}

interface KelasProps {
  kelases: KelasItem[];
}

export default function Kelas({ kelases }: KelasProps) {
  const { data, setData, post, reset, processing, errors } = useForm({
    kelas: '',
    angkatan: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/jadwal/kelas', {
      onSuccess: () => reset(),
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Hapus Kelas ini? Jadwal yang terkait dengan kelas ini juga akan ikut terhapus.')) {
      router.delete(`/admin/jadwal/kelas/${id}`);
    }
  };

  return (
    <AdminLayout 
      title="Manajemen Jadwal" 
      subtitle="Atur jadwal, mata kuliah, kelas, dan angkatan praktikum."
    >
      <Head title="Data Kelas & Angkatan" />

      <section className="p-4 md:p-8">
        
        {/* Navigation Tabs */}
        <div className="mb-6 md:mb-8 border-b border-gray-200 overflow-x-auto custom-scrollbar">
          <nav className="-mb-px flex space-x-6 md:space-x-8 min-w-max" aria-label="Tabs">
            <Link 
              href="/admin/jadwal" 
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            >
              Jadwal Utama
            </Link>
            <Link 
              href="/admin/jadwal/matkul" 
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            >
              Data Mata Kuliah
            </Link>
            <Link 
              href="/admin/jadwal/kelas" 
              className="border-[#203971] text-[#203971] py-4 px-1 border-b-2 font-bold text-sm"
            >
              Data Kelas & Angkatan
            </Link>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Add New Class Form */}
          <div className="md:col-span-1 order-1 md:order-1">
            <div className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-[#203971] mb-4 border-b border-gray-100 pb-2">Tambah Kelas Baru</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nama Kelas</label>
                  <input 
                    type="text" 
                    value={data.kelas}
                    onChange={(e) => setData('kelas', e.target.value)}
                    required 
                    placeholder="Contoh: A" 
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#203971] outline-none uppercase transition-all"
                  />
                  {errors.kelas && <p className="text-[#F32923] text-xs mt-1">{errors.kelas}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Tahun Angkatan</label>
                  <input 
                    type="number" 
                    value={data.angkatan}
                    onChange={(e) => setData('angkatan', e.target.value)}
                    required 
                    min="2020" 
                    max="2030" 
                    placeholder="Contoh: 2026" 
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#203971] outline-none transition-all"
                  />
                  {errors.angkatan && <p className="text-[#F32923] text-xs mt-1">{errors.angkatan}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={processing}
                  className="w-full bg-[#203971] hover:bg-[#152a55] text-white py-2.5 rounded-lg font-bold transition-colors shadow-sm disabled:opacity-85 cursor-pointer"
                >
                  {processing ? 'Menyimpan...' : 'Simpan Kelas'}
                </button>
              </form>
            </div>
          </div>

          {/* Classes Table */}
          <div className="md:col-span-2 order-2 md:order-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm w-full overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm border-collapse min-w-[400px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 font-bold text-gray-600 whitespace-nowrap">Nama Kelas</th>
                      <th className="p-4 font-bold text-gray-600 text-center whitespace-nowrap">Angkatan</th>
                      <th className="p-4 font-bold text-gray-600 text-center whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {kelases.length > 0 ? (
                      kelases.map((kls) => (
                        <tr key={kls.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-bold text-[#203971]">Kelas {kls.kelas}</td>
                          <td className="p-4 text-center font-mono text-gray-700">{kls.angkatan}</td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleDelete(kls.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-2 bg-white border border-gray-200 rounded shadow-sm hover:shadow" 
                              title="Hapus Kelas"
                            >
                              <span className="material-symbols-outlined text-sm block">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-gray-500">
                          Belum ada data kelas yang ditambahkan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </AdminLayout>
  );
}
