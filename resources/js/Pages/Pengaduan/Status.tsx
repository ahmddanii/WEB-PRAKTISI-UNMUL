import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { getStatusColor } from '../../utils';

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
        updated_at: string;
    };
    downloadUrl?: string;
}

export default function Status({ pengaduan, downloadUrl }: PengaduanProps) {

    return (
        <AppLayout>
            <Head title={`Tiket ${pengaduan.nomor_tiket} - PRAKTISI`} />

            <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-12 pb-24">
                <div className="max-w-2xl mx-auto px-6 md:px-8">
                    
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href="/pengaduan"
                            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#203971] transition-colors font-mono tracking-wider"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span> KEMBALI
                        </Link>
                    </div>

                    {/* Status Card Header */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                            <div>
                                <span className="text-xs font-semibold text-gray-400 font-mono tracking-wider">NOMOR TIKET</span>
                                <h2 className="text-2xl font-black text-[#203971] mt-0.5 tracking-tight">{pengaduan.nomor_tiket}</h2>
                                <p className="text-xs text-gray-500 mt-1 font-mono">{new Date(pengaduan.created_at).toLocaleString('id-ID')} WIB</p>
                            </div>
                            
                            <div className="flex flex-col items-start md:items-end gap-1.5">
                                <span className="text-xs font-semibold text-gray-400 font-mono tracking-wider">STATUS SEKARANG</span>
                                <div className={`px-4 py-1.5 rounded-full text-xs font-black font-mono tracking-widest border uppercase ${getStatusColor(pengajuanStatus(pengaduan.status))}`}>
                                    {pengaduan.status}
                                </div>
                            </div>
                        </div>

                        {/* Tracker Timeline */}
                        <div className="py-8">
                            <div className="relative flex justify-between items-center w-full max-w-md mx-auto">
                                <div className="absolute left-0 right-0 h-1 bg-gray-200 z-0"></div>
                                <div 
                                    className={`absolute left-0 h-1 bg-[#203971] z-0 transition-all duration-500`}
                                    style={{
                                        width: pengaduan.status === 'Baru' ? '0%' : pengaduan.status === 'Diproses' ? '50%' : '100%'
                                    }}
                                ></div>

                                {/* Step 1: Baru */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-[#203971] text-white flex items-center justify-center shadow-sm">
                                        <span className="material-symbols-outlined text-sm">done</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600 mt-2 font-mono uppercase tracking-wider">Dikirim</span>
                                </div>

                                {/* Step 2: Diproses */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 ${
                                        pengaduan.status !== 'Baru'
                                            ? 'bg-[#203971] text-white border-[#203971]'
                                            : 'bg-white text-gray-400 border-gray-200'
                                    }`}>
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600 mt-2 font-mono uppercase tracking-wider">Diproses</span>
                                </div>

                                {/* Step 3: Selesai */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 ${
                                        pengaduan.status === 'Selesai'
                                            ? 'bg-emerald-500 text-white border-emerald-500'
                                            : 'bg-white text-gray-400 border-gray-200'
                                    }`}>
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600 mt-2 font-mono uppercase tracking-wider">Selesai</span>
                                </div>
                            </div>
                        </div>

                        {/* Admin Response Box */}
                        {pengaduan.respons ? (
                            <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl space-y-3 mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-lg">forum</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-emerald-800">Tanggapan Asisten Laboratorium</h4>
                                        <p className="text-xs text-emerald-600/80 mt-0.5">Respons dikirim pada {new Date(pengaduan.updated_at).toLocaleDateString('id-ID')} WIB</p>
                                    </div>
                                </div>
                                <div className="bg-white/90 border border-emerald-200/50 rounded-lg p-4 text-sm text-gray-800 leading-relaxed font-medium whitespace-pre-line shadow-sm">
                                    {pengaduan.respons}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-xl text-center space-y-2 mb-2">
                                <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                                    <span className="material-symbols-outlined text-xl">pending_actions</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-amber-800">Menunggu Tanggapan</h4>
                                    <p className="text-xs text-amber-600/80 mt-0.5">Asisten laboratorium sedang mempelajari pengaduan Anda.</p>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Complaint Details */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-sm font-black font-mono text-[#203971] tracking-wider uppercase border-b border-gray-100 pb-3 mb-4">
                            DETAIL ADUAN & ASPIRASI
                        </h3>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            <div>
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Nama Pelapor</dt>
                                <dd className="font-bold text-gray-800 mt-1">{pengaduan.nama}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">NIM</dt>
                                <dd className="font-bold text-gray-800 mt-1 font-mono">{pengaduan.nim}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Kategori</dt>
                                <dd className="font-bold text-gray-800 mt-1">{pengaduan.kategori}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Mata Kuliah Terkait</dt>
                                <dd className="font-medium text-gray-800 mt-1">{pengaduan.matkul_terkait || '-'}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Judul</dt>
                                <dd className="font-bold text-gray-800 mt-1">{pengaduan.judul}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Isi Pengaduan</dt>
                                <dd className="font-normal text-gray-600 mt-1 bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs leading-relaxed whitespace-pre-line">
                                    {pengaduan.isi}
                                </dd>
                            </div>
                            {downloadUrl && (
                                <div className="sm:col-span-2">
                                    <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">File Lampiran</dt>
                                    <dd className="mt-1">
                                        <a
                                            href={downloadUrl}
                                            className="inline-flex items-center gap-2 text-xs font-bold text-[#203971] hover:underline font-mono"
                                        >
                                            <span className="material-symbols-outlined text-sm">attachment</span> UNDUH LAMPIRAN BUKTI
                                        </a>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>

                </div>
            </section>
        </AppLayout>
    );
}

function pengajuanStatus(status: string) {
    return status;
}
