import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Pagination';

interface PengaduanItem {
    id: number;
    nomor_tiket: string;
    kategori: string;
    nama: string;
    nim: string;
    email: string;
    judul: string;
    status: 'Baru' | 'Diproses' | 'Selesai';
    created_at: string;
}

interface IndexProps {
    pengaduans: {
        data: PengaduanItem[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search?: string;
        status?: string;
        kategori?: string;
    };
}

export default function Index({ pengaduans, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [kategori, setKategori] = useState(filters.kategori || '');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search, status, kategori });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setStatus(val);
        applyFilters({ search, status: val, kategori });
    };

    const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setKategori(val);
        applyFilters({ search, status, kategori: val });
    };

    const applyFilters = (newFilters: any) => {
        router.get('/admin/pengaduan', newFilters, {
            preserveState: true,
            replace: true
        });
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Selesai':
                return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
            case 'Diproses':
                return 'bg-amber-50 text-amber-700 border border-amber-200';
            default: // Baru
                return 'bg-blue-50 text-blue-700 border border-blue-200';
        }
    };

    const getKategoriStyle = (kategori: string) => {
        switch (kategori) {
            case 'Keluhan':
                return 'bg-rose-50 text-rose-700 border border-rose-100';
            case 'Saran':
                return 'bg-teal-50 text-teal-700 border border-teal-100';
            case 'Pertanyaan':
                return 'bg-indigo-50 text-indigo-700 border border-indigo-100';
            default:
                return 'bg-gray-50 text-gray-700 border border-gray-100';
        }
    };

    return (
        <AdminLayout
            title="Pengaduan & Aspirasi"
            subtitle="Tinjau keluhan, saran, dan pertanyaan mahasiswa serta berikan tanggapan."
        >
            <Head title="Manajemen Pengaduan & Aspirasi" />

            <section className="p-8">
                
                {/* Search & Filters */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Cari nama, NIM, judul, atau nomor tiket..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-[#203971] text-white px-4 py-2 text-xs font-bold font-mono tracking-wider hover:bg-[#152a55] transition-all rounded shadow-sm cursor-pointer"
                        >
                            CARI
                        </button>
                    </form>

                    <div className="flex items-center gap-3">
                        {/* Filter Status */}
                        <div>
                            <select
                                value={status}
                                onChange={handleStatusChange}
                                className="bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer"
                            >
                                <option value="">Semua Status</option>
                                <option value="Baru">Baru</option>
                                <option value="Diproses">Diproses</option>
                                <option value="Selesai">Selesai</option>
                            </select>
                        </div>

                        {/* Filter Kategori */}
                        <div>
                            <select
                                value={kategori}
                                onChange={handleKategoriChange}
                                className="bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer"
                            >
                                <option value="">Semua Kategori</option>
                                <option value="Keluhan">Keluhan</option>
                                <option value="Saran">Saran</option>
                                <option value="Pertanyaan">Pertanyaan</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm mb-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">TIKET</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">MAHASISWA</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">KATEGORI</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">JUDUL ASPIRASI</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">STATUS</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pengaduans.data.length > 0 ? (
                                pengaduans.data.map((pengaduan) => (
                                    <tr key={pengaduan.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-xs font-bold font-mono text-[#203971]">{pengaduan.nomor_tiket}</td>
                                        <td className="p-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{pengaduan.nama}</p>
                                                <p className="text-xs font-mono text-gray-500">{pengaduan.nim} &bull; {pengaduan.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${getKategoriStyle(pengaduan.kategori)}`}>
                                                {pengaduan.kategori}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs font-medium text-gray-800 truncate max-w-xs">{pengaduan.judul}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-[10px] font-black font-mono tracking-wider rounded-full uppercase ${getStatusStyle(pengaduan.status)}`}>
                                                {pengaduan.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <Link
                                                href={`/admin/pengaduan/${pengaduan.id}`}
                                                className="inline-flex items-center gap-1 bg-[#203971] hover:bg-[#152a55] text-white px-3 py-1.5 rounded text-[11px] font-bold font-mono transition-colors shadow-sm cursor-pointer"
                                            >
                                                TINJAU <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500 italic">
                                        Tidak ada data pengaduan yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pengaduans.total > 0 && (
                    <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                        <span className="text-xs text-gray-500 font-mono">
                            Menampilkan {pengaduans.data.length} dari {pengaduans.total} pengaduan
                        </span>
                        <Pagination links={pengaduans.links} />
                    </div>
                )}

            </section>
        </AdminLayout>
    );
}
