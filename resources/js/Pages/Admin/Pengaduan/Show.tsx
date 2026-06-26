import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface PengaduanProps {
    pengaduan: {
        id: number;
        nomor_tiket: string;
        kategori: string;
        nama: string;
        nim: string;
        email: string;
        no_hp?: string;
        matkul_terkait?: string;
        judul: string;
        isi: string;
        lampiran?: string;
        status: 'Baru' | 'Diproses' | 'Selesai';
        respons?: string;
        created_at: string;
    };
    lampiranUrl?: string;
}

export default function Show({ pengaduan, lampiranUrl }: PengaduanProps) {
    const [isResponding, setIsResponding] = useState(false);

    const fileLampiranName = pengaduan.lampiran || '';
    const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(fileLampiranName);
    const isPdf = /\.pdf$/i.test(fileLampiranName);

    // Form Respons
    const form = useForm({
        respons: pengaduan.respons || '',
        status: pengaduan.status === 'Baru' ? 'Diproses' : pengaduan.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(`/admin/pengaduan/${pengaduan.id}/respond`, {
            onSuccess: () => setIsResponding(false),
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
            title={`Detail Pengaduan ${pengaduan.nomor_tiket}`}
            subtitle="Tinjau rincian aspirasi mahasiswa dan berikan respons tindak lanjut."
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
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Nama Lengkap</dt>
                                    <dd className="font-bold text-gray-800 mt-1">{pengaduan.nama}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">NIM</dt>
                                    <dd className="font-bold text-gray-800 mt-1 font-mono">{pengaduan.nim}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Email</dt>
                                    <dd className="font-medium text-gray-800 mt-1 font-mono">{pengaduan.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">No. HP / WhatsApp</dt>
                                    <dd className="font-medium text-gray-800 mt-1 font-mono">{pengaduan.no_hp || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Kategori Aspirasi</dt>
                                    <dd className="mt-1">
                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${getKategoriStyle(pengaduan.kategori)}`}>
                                            {pengaduan.kategori}
                                        </span>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Mata Kuliah Terkait</dt>
                                    <dd className="font-medium text-gray-800 mt-1">{pengaduan.matkul_terkait || '-'}</dd>
                                </div>
                                <div className="col-span-2">
                                    <dt className="text-gray-400 font-mono tracking-wider uppercase">Tanggal Pengajuan</dt>
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
                                    <span className="text-xs text-gray-400 font-mono tracking-wider uppercase block mb-1">Judul Aspirasi:</span>
                                    <p className="text-sm font-bold text-gray-900 mb-3">{pengaduan.judul}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 font-mono tracking-wider uppercase block mb-1">Isi Rincian Pengaduan:</span>
                                    <p className="text-sm bg-gray-50 border border-gray-100 rounded-lg p-4 font-normal text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {pengaduan.isi}
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
                                STATUS TIKET
                            </h3>

                            <div className="text-center py-4 space-y-4">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black font-mono tracking-widest border uppercase ${getStatusStyle(pengaduan.status)}`}>
                                    {pengaduan.status}
                                </span>

                                {!isResponding && (
                                    <div className="pt-2">
                                        <button
                                            onClick={() => setIsResponding(true)}
                                            className="w-full bg-[#203971] hover:bg-[#152a55] text-white py-2.5 rounded font-bold font-mono tracking-wider text-xs cursor-pointer transition-colors shadow-sm"
                                        >
                                            TULIS TANGGAPAN
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tanggapan Admin yang sudah ada */}
                        {pengaduan.respons && !isResponding && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <h3 className="font-mono text-xs font-bold text-[#203971] tracking-widest uppercase border-b border-gray-100 pb-3 mb-4">
                                    TANGGAPAN ADMIN
                                </h3>
                                <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded text-xs leading-relaxed font-medium">
                                    <p className="text-gray-700 whitespace-pre-wrap font-normal">{pengaduan.respons}</p>
                                </div>
                            </div>
                        )}

                        {/* Respond Form Panel */}
                        {isResponding && (
                            <div className="bg-white border border-[#203971]/20 rounded-lg p-5 shadow-sm space-y-4">
                                <h4 className="font-bold text-xs text-[#203971] font-mono tracking-wider uppercase">TULIS TANGGAPAN ASPIRASI</h4>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Isi Tanggapan / Solusi</label>
                                        <textarea
                                            value={form.data.respons}
                                            onChange={(e) => form.setData('respons', e.target.value)}
                                            required
                                            rows={6}
                                            placeholder="Tulis respons penjelasan atau tindak lanjut atas pengaduan ini..."
                                            className="w-full bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none resize-none"
                                        />
                                        {form.errors.respons && (
                                            <span className="text-red-500 text-[10px] mt-1 block">{form.errors.respons}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Update Status Tiket</label>
                                        <select
                                            value={form.data.status}
                                            onChange={(e) => form.setData('status', e.target.value as any)}
                                            className="w-full bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer"
                                        >
                                            <option value="Diproses">Diproses</option>
                                            <option value="Selesai">Selesai</option>
                                        </select>
                                        {form.errors.status && (
                                            <span className="text-red-500 text-[10px] mt-1 block">{form.errors.status}</span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={form.processing}
                                            className="flex-1 bg-[#203971] hover:bg-[#152a55] text-white py-2 rounded font-bold font-mono text-[11px] tracking-wider transition-colors shadow-sm cursor-pointer"
                                        >
                                            SIMPAN & KIRIM
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsResponding(false)}
                                            className="px-3 border border-gray-300 rounded text-gray-600 font-bold font-mono text-[11px] hover:bg-gray-50 cursor-pointer"
                                        >
                                            BATAL
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                    </div>

                </div>

            </section>
        </AdminLayout>
    );
}
