import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Berita {
  id: number;
  judul: string;
  slug: string;
  isi: string;
  thumbnail?: string;
  kategori?: string;
  author: string;
  created_at: string;
}

interface EditProps {
  berita: Berita;
}

export default function Edit({ berita }: EditProps) {
  // We use useForm with a POST request spoofed as PUT because browsers don't support file uploads over PUT/PATCH.
  const { data, setData, post, errors, processing } = useForm({
    _method: 'PUT',
    judul: berita.judul || '',
    author: berita.author || '',
    kategori: berita.kategori || '',
    thumbnail: null as File | null,
    isi: berita.isi || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/admin/berita/${berita.id}`);
  };

  return (
    <AdminLayout
      title="Edit Berita"
      subtitle="Perbarui informasi dan konten berita yang sudah diterbitkan."
    >
      <Head title="Edit Berita" />

      <section className="p-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-4xl">
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-[#203971] mb-2">
                    Judul Artikel <span className="text-[#F32923]">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.judul}
                    onChange={(e) => setData('judul', e.target.value)}
                    required
                    placeholder="Contoh: Pembaruan Jadwal Praktikum Ganjil"
                    className={`w-full h-12 bg-gray-50 border ${errors.judul ? 'border-[#F32923]' : 'border-gray-300'} rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all`}
                  />
                  {errors.judul && (
                    <p className="text-[#F32923] text-xs mt-1">
                      {errors.judul}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#203971] mb-2">
                    Penulis (Author) <span className="text-[#F32923]">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.author}
                    onChange={(e) => setData('author', e.target.value)}
                    required
                    placeholder="Contoh: Tim Laboratorium"
                    className={`w-full h-12 bg-gray-50 border ${errors.author ? 'border-[#F32923]' : 'border-gray-300'} rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all`}
                  />
                  {errors.author && (
                    <p className="text-[#F32923] text-xs mt-1">
                      {errors.author}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#203971] mb-2">
                    Kategori <span className="text-[#F32923]">*</span>
                  </label>
                  <select
                    value={data.kategori}
                    onChange={(e) => setData('kategori', e.target.value)}
                    required
                    className={`w-full h-12 bg-gray-50 border ${errors.kategori ? 'border-[#F32923]' : 'border-gray-300'} rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all`}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Berita">Berita Akademik</option>
                    <option value="Workshop">Workshop / Kegiatan</option>
                  </select>
                  {errors.kategori && (
                    <p className="text-[#F32923] text-xs mt-1">
                      {errors.kategori}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#203971] mb-2">
                    Thumbnail / Gambar Sampul
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setData(
                        'thumbnail',
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                    accept="image/*"
                    className={`w-full bg-gray-50 border ${errors.thumbnail ? 'border-[#F32923]' : 'border-gray-300'} rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#203971] file:text-white hover:file:bg-[#152a55]`}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: JPG, PNG, WEBP. Kosongkan jika tidak ingin mengubah
                    gambar.
                  </p>

                  {berita.thumbnail && (
                    <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg w-fit">
                      <img
                        src={`/storage/${berita.thumbnail}`}
                        alt="Thumbnail Saat Ini"
                        className="w-16 h-16 object-cover rounded shadow-sm"
                      />
                      <div className="text-xs text-gray-500">
                        <span className="font-bold text-gray-700 block">
                          Gambar Saat Ini
                        </span>
                        Akan terganti jika Anda mengupload file baru.
                      </div>
                    </div>
                  )}
                  {errors.thumbnail && (
                    <p className="text-[#F32923] text-xs mt-1">
                      {errors.thumbnail}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#203971] mb-2">
                  Isi Berita <span className="text-[#F32923]">*</span>
                </label>
                <textarea
                  value={data.isi}
                  onChange={(e) => setData('isi', e.target.value)}
                  required
                  rows={10}
                  placeholder="Tuliskan isi lengkap berita atau pengumuman di sini..."
                  className={`w-full bg-gray-50 border ${errors.isi ? 'border-[#F32923]' : 'border-gray-300'} rounded-lg p-4 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all`}
                />
                {errors.isi && (
                  <p className="text-[#F32923] text-xs mt-1">{errors.isi}</p>
                )}
              </div>
            </div>

            <div className="px-8 py-5 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <Link
                href="/admin/berita"
                className="text-gray-500 hover:text-gray-800 font-medium text-sm flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  arrow_back
                </span>{' '}
                Batal & Kembali
              </Link>
              <button
                type="submit"
                disabled={processing}
                className="bg-[#203971] hover:bg-[#152a55] text-white px-6 py-2.5 font-bold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-85"
              >
                <span className="material-symbols-outlined text-sm">
                  {processing ? 'progress_activity' : 'save'}
                </span>
                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </AdminLayout>
  );
}
