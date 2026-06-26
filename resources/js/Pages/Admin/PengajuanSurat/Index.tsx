import React, { useState, useEffect } from 'react';
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
    matkul: string;
    kelas_sesi: string;
    tanggal_praktikum: string;
    sesi_tujuan?: string;
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
        pindah_sesi?: string;
    };
}

export default function Index({ surats, filters }: IndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [pindahSesi, setPindahSesi] = useState(filters.pindah_sesi || '');

    useEffect(() => {
        setSearch(filters.search || '');
        setStatus(filters.status || '');
        setPindahSesi(filters.pindah_sesi || '');
    }, [filters]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search, status, pindah_sesi: pindahSesi });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setStatus(val);
        applyFilters({ search, status: val, pindah_sesi: pindahSesi });
    };

    const handlePindahSesiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setPindahSesi(val);
        applyFilters({ search, status, pindah_sesi: val });
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

                        {/* Filter Pindah Sesi */}
                        <div>
                            <select
                                value={pindahSesi}
                                onChange={handlePindahSesiChange}
                                className="bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer"
                            >
                                <option value="">Semua Pengajuan</option>
                                <option value="ya">Hanya Pindah Sesi</option>
                                <option value="tidak">Tanpa Pindah Sesi</option>
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
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">MATA KULIAH</th>
                                <th className="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider text-center">PINDAH SESI</th>
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
                                        <td className="p-4">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-700">{surat.matkul}</p>
                                                <p className="text-[10px] text-gray-400 font-mono">{surat.kelas_sesi}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            {surat.sesi_tujuan ? (
                                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded text-[10px] font-bold">
                                                    <span className="material-symbols-outlined text-[10px] block">check_circle</span> YA
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center bg-gray-50 text-gray-400 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-bold">
                                                    — TIDAK
                                                </span>
                                            )}
                                        </td>
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
                                    <td colSpan={7} className="p-8 text-center text-gray-500 italic">
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
