import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface PengaduanProps {
    pengaduan: {
        id: number;
        nomor_tiket: string;
        kategori: string;
        kategori_label: string;
        angkatan: number;
        mata_kuliah?: {
            id: number;
            nama_mk: string;
        };
        pelapor: string;
        isi_pengaduan: string;
        file_lampiran?: string;
        status: 'baru' | 'sudah_dibahas';
        dibahas_at?: string;
        dibahas_oleh?: {
            id: number;
            name: string;
        };
        created_at: string;
    };
    lampiranUrl?: string;
}

export default function Show({ pengaduan, lampiranUrl }: PengaduanProps) {
    const fileLampiranName = pengaduan.file_lampiran || '';
    const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(fileLampiranName);
    const isPdf = /\.pdf$/i.test(fileLampiranName);

    const handleTandaiDibahas = () => {
        router.post(`/admin/pengaduan/${pengaduan.id}/tandai-dibahas`, {}, {
            preserveScroll: true
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
            case 'keluhan':
                return 'bg-rose-50 text-rose-700 border border-rose-100';
            case 'saran':
                return 'bg-teal-50 text-teal-700 border border-teal-100';
            case 'pertanyaan':
                return 'bg-indigo-50 text-indigo-700 border border-indigo-100';
            default:
                return 'bg-gray-50 text-gray-700 border border-gray-100';
        }
    };

    return (
        <AdminLayout
            title={`Detail Pengaduan ${pengaduan.nomor_tiket}`}
            subtitle="Tinjau rincian aspirasi mahasiswa untuk rapat evaluasi."
        >
            <Head title={`Detail Pengaduan ${pengaduan.nomor_tiket}`} />

            <section className="p-8 max-w-4xl">
                
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        href="/admin/pengaduan"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#203971] transition-colors font-mono tracking-wider"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span> KEMBALI KE LIST
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Left: Detail Info (Col Span 2) */}
                    <div className="md:col-span-2 space-y-6">
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h3 className="font-mono text-xs font-bold text-[#203971] tracking-widest uppercase border-b border-gray-100 pb-3 mb-4">
                                RINCIAN MAHASISWA & KATEGORI
                            </h3>

                            <dl className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Pelapor</dt>
                                    <dd className="font-bold text-gray-800 mt-1">{pengaduan.pelapor}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Angkatan</dt>
                                    <dd className="font-bold text-gray-800 mt-1">Angkatan {pengaduan.angkatan}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Kategori Aspirasi</dt>
                                    <dd className="mt-1">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded capitalize ${getKategoriStyle(pengaduan.kategori)}`}>
                                            {pengaduan.kategori_label}
                                        </span>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Mata Kuliah Terkait</dt>
                                    <dd className="font-medium text-[#203971] font-mono mt-1">
                                        {pengaduan.mata_kuliah ? pengaduan.mata_kuliah.nama_mk : 'Umum / Tidak spesifik'}
                                    </dd>
                                </div>
                                <div className="col-span-2">
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Tanggal Masuk</dt>
                                    <dd className="font-medium text-gray-800 mt-1 font-mono">
                                        {new Date(pengaduan.created_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })} WITA
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h3 className="font-mono text-xs font-bold text-[#203971] tracking-widest uppercase border-b border-gray-100 pb-3 mb-4">
                                ISI ASPIRASI / KELUHAN
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs text-gray-400 font-mono tracking-wider uppercase block mb-1">Isi Rincian Pengaduan:</span>
                                    <p className="text-sm bg-gray-55/35 border border-gray-100 rounded-lg p-4 font-normal text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {pengaduan.isi_pengaduan}
                                    </p>
                                </div>

                                {lampiranUrl ? (
                                    <div className="pt-2 space-y-3">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                            <span className="text-xs text-gray-500 font-mono tracking-wider uppercase font-bold">File Lampiran / Bukti:</span>
                                            <a
                                                href={lampiranUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#203971] hover:underline font-mono"
                                            >
                                                <span className="material-symbols-outlined text-sm">open_in_new</span> Buka di Tab Baru
                                            </a>
                                        </div>

                                        {isImage && (
                                            <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-2">
                                                <img
                                                    src={lampiranUrl}
                                                    alt="Lampiran Pengaduan"
                                                    className="max-w-full h-auto max-h-[500px] rounded mx-auto object-contain"
                                                />
                                            </div>
                                        )}

                                        {isPdf && (
                                            <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-[500px]">
                                                <iframe
                                                    src={lampiranUrl}
                                                    className="w-full h-full border-0"
                                                    title="Lampiran Pengaduan PDF"
                                                />
                                            </div>
                                        )}

                                        {!isImage && !isPdf && (
                                            <div className="bg-gray-50 border border-gray-100 p-4 rounded text-xs">
                                                <a
                                                    href={lampiranUrl}
                                                    className="inline-flex items-center gap-2 font-bold text-[#203971] hover:underline font-mono"
                                                >
                                                    <span className="material-symbols-outlined text-sm">download</span> UNDUH FILE LAMPIRAN / BUKTI
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-400 italic">Tidak ada file lampiran yang diunggah.</p>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right: Actions / Status */}
                    <div className="space-y-6">
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h3 className="font-mono text-xs font-bold text-[#203971] tracking-widest uppercase border-b border-gray-100 pb-3 mb-4">
                                STATUS EVALUASI
                            </h3>

                            <div className="text-center py-4 space-y-4">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black font-mono tracking-widest border uppercase ${getStatusStyle(pengaduan.status)}`}>
                                    {pengaduan.status === 'sudah_dibahas' ? 'SUDAH DIBAHAS' : 'BARU'}
                                </span>

                                {pengaduan.status === 'baru' && (
                                    <div className="pt-2">
                                        <button
                                            onClick={handleTandaiDibahas}
                                            className="w-full bg-[#203971] hover:bg-[#152a55] text-white py-2.5 rounded font-bold font-mono tracking-wider text-xs cursor-pointer transition-colors shadow-sm"
                                        >
                                            TANDAI SUDAH DIBAHAS
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dibahas Oleh */}
                        {pengaduan.status === 'sudah_dibahas' && (
                            <div className="bg-white border border-emerald-100 rounded-lg p-6 shadow-sm">
                                <h3 className="font-mono text-xs font-bold text-emerald-800 tracking-widest uppercase border-b border-gray-100 pb-3 mb-4">
                                    RIWAYAT EVALUASI
                                </h3>
                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded text-xs space-y-2 font-medium">
                                    <div>
                                        <strong className="text-emerald-950 font-bold block">Dibahas Oleh:</strong>
                                        <p className="text-gray-700 mt-0.5">{pengaduan.dibahas_oleh?.name || 'Admin'}</p>
                                    </div>
                                    <div>
                                        <strong className="text-emerald-950 font-bold block">Dibahas Pada:</strong>
                                        <p className="text-gray-700 mt-0.5 font-mono">
                                            {pengaduan.dibahas_at
                                                ? new Date(pengaduan.dibahas_at).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }) + ' WITA'
                                                : '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                </div>

            </section>
        </AdminLayout>
    );
}
