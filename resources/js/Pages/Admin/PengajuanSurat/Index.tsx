import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Pagination';

interface PengajuanItem {
    id: number;
    nomor_pengajuan: string;
    jenis_surat: string;
    nama: string;
    nim: string;
    email: string;
    tanggal_praktikum: string;
    status: 'Menunggu' | 'Disetujui' | 'Ditolak';
    created_at: string;
}

interface IndexProps {
    surats: {
        data: PengajuanItem[];
        links: any[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        search?: string;
        status?: string;
        jenis_surat?: string;
    };
}

export default function Index({ surats, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [jenisSurat, setJenisSurat] = useState(filters.jenis_surat || '');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search, status, jenis_surat: jenisSurat });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setStatus(val);
        applyFilters({ search, status: val, jenis_surat: jenisSurat });
    };

    const handleJenisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setJenisSurat(val);
        applyFilters({ search, status, jenis_surat: val });
    };

    const applyFilters = (newFilters: any) => {
        router.get('/admin/pengajuan-surat', newFilters, {
            preserveState: true,
            replace: true
        });
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Disetujui':
                return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
            case 'Ditolak':
                return 'bg-rose-50 text-rose-700 border border-rose-200';
            default:
                return 'bg-amber-50 text-amber-700 border border-amber-200';
        }
    };

    return (
        <AdminLayout
            title="Pengajuan Surat"
            subtitle="Tinjau dan kelola surat izin tidak hadir dan permohonan sesi mahasiswa."
        >
            <Head title="Manajemen Pengajuan Surat" />

            <section className="p-8">
                
                {/* Search & Filters */}
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Cari nama, NIM, atau nomor pengajuan..."
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
                                <option value="Menunggu">Menunggu</option>
                                <option value="Disetujui">Disetujui</option>
                                <option value="Ditolak">Ditolak</option>
                            </select>
                        </div>

                        {/* Filter Jenis Surat */}
                        <div>
                            <select
                                value={jenisSurat}
                                onChange={handleJenisChange}
                                className="bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer"
                            >
                                <option value="">Semua Jenis Surat</option>
                                <option value="Izin Tidak Hadir">Izin Tidak Hadir</option>
                                <option value="Pindah Sesi">Pindah Sesi</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm mb-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">NOMOR</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">MAHASISWA</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">JENIS SURAT</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">TGL PRAKTIKUM</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">STATUS</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider text-center">AKSI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {surats.data.length > 0 ? (
                                surats.data.map((surat) => (
                                    <tr key={surat.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-xs font-bold font-mono text-[#203971]">{surat.nomor_pengajuan}</td>
                                        <td className="p-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{surat.nama}</p>
                                                <p className="text-xs font-mono text-gray-500">{surat.nim} &bull; {surat.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-xs font-medium text-gray-600">{surat.jenis_surat}</td>
                                        <td className="p-4 text-xs font-mono text-gray-600">
                                            {new Date(surat.tanggal_praktikum).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-[10px] font-black font-mono tracking-wider rounded-full uppercase ${getStatusStyle(surat.status)}`}>
                                                {surat.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <Link
                                                href={`/admin/pengajuan-surat/${surat.id}`}
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
                                        Tidak ada data pengajuan surat yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {surats.total > 0 && (
                    <div className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                        <span className="text-xs text-gray-500 font-mono">
                            Menampilkan {surats.data.length} dari {surats.total} pengajuan
                        </span>
                        <Pagination links={surats.links} />
                    </div>
                )}

            </section>
        </AdminLayout>
    );
}
