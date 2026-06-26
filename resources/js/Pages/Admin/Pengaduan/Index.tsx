import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Pagination';

interface PengaduanItem {
    id: number;
    nomor_tiket: string;
    kategori: 'pengaduan' | 'aspirasi';
    kategori_label: string;
    angkatan: number;
    mata_kuliah?: {
        id: number;
        nama_mk: string;
    };
    pelapor: string;
    isi_pengaduan: string;
    status: 'baru' | 'sudah_dibahas';
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
    mataKuliahs: {
        id: number;
        nama_mk: string;
    }[];
    filters: {
        search?: string;
        status?: string;
        kategori?: string;
        angkatan?: string;
        mata_kuliah_id?: string;
    };
}

export default function Index({ pengaduans, mataKuliahs, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [kategori, setKategori] = useState(filters.kategori || '');
    const [angkatan, setAngkatan] = useState(filters.angkatan || '');
    const [mataKuliahId, setMataKuliahId] = useState(filters.mata_kuliah_id || '');

    const currentYear = new Date().getFullYear();
    const angkatanList = Array.from({ length: 5 }, (_, i) => currentYear - i);

    useEffect(() => {
        setSearch(filters.search || '');
        setStatus(filters.status || '');
        setKategori(filters.kategori || '');
        setAngkatan(filters.angkatan || '');
        setMataKuliahId(filters.mata_kuliah_id || '');
    }, [filters]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search, status, kategori, angkatan, mata_kuliah_id: mataKuliahId });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setStatus(val);
        applyFilters({ search, status: val, kategori, angkatan, mata_kuliah_id: mataKuliahId });
    };

    const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setKategori(val);
        applyFilters({ search, status, kategori: val, angkatan, mata_kuliah_id: mataKuliahId });
    };

    const handleAngkatanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setAngkatan(val);
        applyFilters({ search, status, kategori, angkatan: val, mata_kuliah_id: mataKuliahId });
    };

    const handleMataKuliahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setMataKuliahId(val);
        applyFilters({ search, status, kategori, angkatan, mata_kuliah_id: val });
    };

    const applyFilters = (newFilters: any) => {
        router.get('/admin/pengaduan', newFilters, {
            preserveState: true,
            replace: true
        });
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'sudah_dibahas':
                return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
            default: // baru
                return 'bg-blue-50 text-blue-700 border border-blue-200';
        }
    };

    const getKategoriStyle = (kategori: string) => {
        switch (kategori) {
            case 'pengaduan':
                return 'bg-rose-50 text-rose-700 border border-rose-100';
            case 'aspirasi':
                return 'bg-teal-50 text-teal-700 border border-teal-100';
            default:
                return 'bg-gray-50 text-gray-700 border border-gray-100';
        }
    };

    // Serialize filters for presentation mode URL
    const getPresentasiUrl = () => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (status) params.append('status', status);
        if (kategori) params.append('kategori', kategori);
        if (angkatan) params.append('angkatan', angkatan);
        if (mataKuliahId) params.append('mata_kuliah_id', mataKuliahId);
        return `/admin/pengaduan/presentasi?${params.toString()}`;
    };

    return (
        <AdminLayout
            title="Pengaduan & Aspirasi"
            subtitle="Kumpulkan masukan mahasiswa untuk bahan rapat evaluasi aslab."
        >
            <Head title="Manajemen Pengaduan & Aspirasi" />

            <section className="p-8">
                
                {/* Upper bar with presentation button */}
                <div className="flex justify-end mb-6">
                    <Link
                        href={getPresentasiUrl()}
                        className="inline-flex items-center gap-2 bg-[#203971] hover:bg-[#152a55] text-white px-5 py-2.5 rounded-lg text-xs font-bold font-mono tracking-widest transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
                    >
                        <span className="material-symbols-outlined text-sm">co_present</span> MODE PRESENTASI RAPAT
                    </Link>
                </div>

                {/* Search & Filters */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Cari pelapor, NIM, atau isi pengaduan..."
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

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Filter Status */}
                        <div>
                            <select
                                value={status}
                                onChange={handleStatusChange}
                                className="bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer"
                            >
                                <option value="">Semua Status</option>
                                <option value="baru">Baru (Belum Dibahas)</option>
                                <option value="sudah_dibahas">Sudah Dibahas</option>
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
                                <option value="pengaduan">Pengaduan</option>
                                <option value="aspirasi">Aspirasi</option>
                            </select>
                        </div>

                        {/* Filter Angkatan */}
                        <div>
                            <select
                                value={angkatan}
                                onChange={handleAngkatanChange}
                                className="bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer"
                            >
                                <option value="">Semua Angkatan</option>
                                {angkatanList.map((yr) => (
                                    <option key={yr} value={yr}>
                                        Angkatan {yr}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filter Mata Kuliah */}
                        <div>
                            <select
                                value={mataKuliahId}
                                onChange={handleMataKuliahChange}
                                className="bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer max-w-[200px]"
                            >
                                <option value="">Semua Mata Kuliah</option>
                                {mataKuliahs.map((mk) => (
                                    <option key={mk.id} value={mk.id}>
                                        {mk.nama_mk}
                                    </option>
                                ))}
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
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">ANGKATAN / MATKUL</th>
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
                                                <p className="text-sm font-bold text-gray-800">{pengaduan.pelapor}</p>
                                                <p className="text-xs font-mono text-gray-400">
                                                    {new Date(pengaduan.created_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded capitalize ${getKategoriStyle(pengaduan.kategori)}`}>
                                                {pengaduan.kategori_label}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-700">Angkatan {pengaduan.angkatan}</p>
                                                <p className="text-[11px] text-[#203971] font-mono truncate max-w-xs">
                                                    {pengaduan.mata_kuliah ? pengaduan.mata_kuliah.nama_mk : 'Umum / Tidak spesifik'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-[10px] font-black font-mono tracking-wider rounded-full uppercase ${getStatusStyle(pengaduan.status)}`}>
                                                {pengaduan.status === 'sudah_dibahas' ? 'SUDAH DIBAHAS' : 'BARU'}
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
