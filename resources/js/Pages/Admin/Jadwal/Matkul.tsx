import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface MatkulItem {
  id: number;
  kode_mk: string;
  nama_mk: string;
  semester: number;
}

interface MatkulProps {
  matkuls: MatkulItem[];
}

export default function Matkul({ matkuls }: MatkulProps) {
  const { data, setData, post, reset, processing, errors } = useForm({
    kode_mk: '',
    nama_mk: '',
    semester: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/jadwal/matkul', {
      onSuccess: () => reset(),
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Hapus Mata Kuliah ini? Jadwal yang memakai MK ini juga akan terhapus.')) {
      router.delete(`/admin/jadwal/matkul/${id}`);
    }
  };

  return (
    <AdminLayout 
      title="Manajemen Jadwal" 
      subtitle="Atur jadwal, mata kuliah, kelas, dan angkatan praktikum."
    >
      <Head title="Data Mata Kuliah" />

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
              className="border-[#203971] text-[#203971] py-4 px-1 border-b-2 font-bold text-sm"
            >
              Data Mata Kuliah
            </Link>
            <Link 
              href="/admin/jadwal/kelas" 
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            >
              Data Angkatan & Kelas
            </Link>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Add Subject Form */}
          <div className="md:col-span-1 order-1 md:order-1">
            <div className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-[#203971] mb-4 border-b border-gray-100 pb-2">Tambah Mata Kuliah</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Kode MK</label>
                  <input 
                    type="text" 
                    value={data.kode_mk}
                    onChange={(e) => setData('kode_mk', e.target.value)}
                    required 
                    placeholder="Contoh: PBW" 
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#203971] outline-none transition-all uppercase"
                  />
                  {errors.kode_mk && <p className="text-[#F32923] text-xs mt-1">{errors.kode_mk}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nama Mata Kuliah</label>
                  <input 
                    type="text" 
                    value={data.nama_mk}
                    onChange={(e) => setData('nama_mk', e.target.value)}
                    required 
                    placeholder="Contoh: Pemrograman Berbasis Web" 
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#203971] outline-none transition-all"
                  />
                  {errors.nama_mk && <p className="text-[#F32923] text-xs mt-1">{errors.nama_mk}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Semester</label>
                  <input 
                    type="number" 
                    value={data.semester}
                    onChange={(e) => setData('semester', e.target.value)}
                    required 
                    min="1" 
                    max="8" 
                    placeholder="Contoh: 4" 
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#203971] outline-none transition-all"
                  />
                  {errors.semester && <p className="text-[#F32923] text-xs mt-1">{errors.semester}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={processing}
                  className="w-full bg-[#203971] hover:bg-[#152a55] text-white py-2.5 rounded-lg font-bold transition-colors shadow-sm mt-2 disabled:opacity-85 cursor-pointer"
                >
                  {processing ? 'Menyimpan...' : 'Simpan Mata Kuliah'}
                </button>
              </form>
            </div>
          </div>

          {/* Subjects Table */}
          <div className="md:col-span-2 order-2 md:order-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm w-full">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 font-bold text-gray-600 whitespace-nowrap">Kode</th>
                      <th className="p-4 font-bold text-gray-600 whitespace-nowrap">Nama Mata Kuliah</th>
                      <th className="p-4 font-bold text-gray-600 text-center whitespace-nowrap">Semester</th>
                      <th className="p-4 font-bold text-gray-600 text-center whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {matkuls.length > 0 ? (
                      matkuls.map((mk) => (
                        <tr key={mk.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-mono text-[#203971] font-bold">{mk.kode_mk}</td>
                          <td className="p-4 font-medium text-gray-800">{mk.nama_mk}</td>
                          <td className="p-4 text-center text-gray-700">{mk.semester}</td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleDelete(mk.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-2 bg-white border border-gray-200 rounded shadow-sm hover:shadow" 
                              title="Hapus Mata Kuliah"
                            >
                              <span className="material-symbols-outlined text-sm block">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-500">
                          Belum ada data Mata Kuliah yang ditambahkan.
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
