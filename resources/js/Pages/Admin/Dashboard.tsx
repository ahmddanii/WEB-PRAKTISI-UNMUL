import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

interface DashboardProps {
  totalBerita: number;
  totalPengurus: number;
  totalMatkul: number;
}

export default function Dashboard({
  totalBerita,
  totalPengurus,
  totalMatkul,
}: DashboardProps) {
  return (
    <AdminLayout
      title="Dashboard Utama"
      subtitle="Ringkasan aktivitas dan status portal praktikum"
    >
      <Head title="Ringkasan Dashboard" />

      <section className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-600">
            Sistem Berjalan Normal
          </span>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="academic-card p-6 rounded-xl group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-500 font-mono text-[12px] uppercase tracking-wider">
                Total Berita
              </span>
              <span className="material-symbols-outlined text-[#203971] group-hover:scale-110 transition-transform">
                drafts
              </span>
            </div>
            <div className="text-4xl font-bold text-[#F32923]">
              {totalBerita}
            </div>
            <div className="mt-2 text-[12px] text-gray-500 font-bold font-mono">
              Berita dipublikasi
            </div>
          </div>

          <div className="academic-card p-6 rounded-xl group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-500 font-mono text-[12px] uppercase tracking-wider">
                Jumlah Pengurus
              </span>
              <span className="material-symbols-outlined text-[#203971] group-hover:scale-110 transition-transform">
                badge
              </span>
            </div>
            <div className="text-4xl font-bold text-[#203971]">
              {totalPengurus}
            </div>
            <div className="mt-2 text-[12px] text-gray-500 font-bold font-mono">
              Pengurus aktif
            </div>
          </div>

          <div className="academic-card p-6 rounded-xl group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-500 font-mono text-[12px] uppercase tracking-wider">
                Mata Kuliah Praktikum
              </span>
              <span className="material-symbols-outlined text-[#203971] group-hover:scale-110 transition-transform">
                menu_book
              </span>
            </div>
            <div className="text-4xl font-bold text-[#203971]">
              {totalMatkul}
            </div>
            <div className="mt-2 text-[12px] text-emerald-600 font-bold flex items-center gap-1 font-mono">
              <span className="material-symbols-outlined text-sm">
                check_circle
              </span>{' '}
              Terdaftar di sistem
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h3 className="font-bold text-[12px] uppercase tracking-widest text-gray-500 font-mono mb-6">
            Aksi Cepat
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/admin/jadwal"
              className="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-gray-300 hover:border-[#203971] hover:bg-[#203971]/5 transition-all group rounded-xl"
            >
              <span className="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-[#203971]">
                edit_calendar
              </span>
              <span className="font-bold text-[14px] text-[#203971]">
                Kelola Jadwal
              </span>
            </Link>
            <Link
              href="/admin/berita"
              className="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-gray-300 hover:border-[#203971] hover:bg-[#203971]/5 transition-all group rounded-xl"
            >
              <span className="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-[#203971]">
                history_edu
              </span>
              <span className="font-bold text-[14px] text-[#203971]">
                Tulis Berita
              </span>
            </Link>
            <Link
              href="/admin/pengurus"
              className="flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed border-gray-300 hover:border-[#203971] hover:bg-[#203971]/5 transition-all group rounded-xl"
            >
              <span className="material-symbols-outlined text-[32px] text-gray-400 group-hover:text-[#203971]">
                person_add
              </span>
              <span className="font-bold text-[14px] text-[#203971]">
                Tambah Pengurus
              </span>
            </Link>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
