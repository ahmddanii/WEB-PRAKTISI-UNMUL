import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

interface PengajuanProps {
    pengajuan: {
        id: number;
        nomor_pengajuan: string;
        jenis_surat: string;
        nama: string;
        nim: string;
        email: string;
        no_hp: string;
        matkul: string;
        kelas_sesi: string;
        tanggal_praktikum: string;
        sesi_asal?: string;
        sesi_tujuan?: string;
        alasan: string;
        status: 'Menunggu' | 'Disetujui' | 'Ditolak';
        catatan?: string;
        created_at: string;
    };
    downloadUrl: string;
}

export default function Status({ pengajuan, downloadUrl }: PengajuanProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Disetujui':
                return 'bg-emerald-500 text-white border-emerald-600';
            case 'Ditolak':
                return 'bg-rose-500 text-white border-rose-600';
            default:
                return 'bg-amber-500 text-white border-amber-600';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Disetujui':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Ditolak':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            default:
                return 'bg-amber-50 text-amber-700 border-amber-200';
        }
    };

    return (
        <AppLayout>
            <Head title={`Status Pengajuan ${pengajuan.nomor_pengajuan} - PRAKTISI`} />

            <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-12 pb-24">
                <div className="max-w-2xl mx-auto px-6 md:px-8">
                    
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href="/pengajuan-surat"
                            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#203971] transition-colors font-mono tracking-wider"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span> KEMBALI
                        </Link>
                    </div>

                    {/* Status Card Header */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                            <div>
                                <span className="text-xs font-semibold text-gray-400 font-mono tracking-wider">NOMOR PENGAJUAN</span>
                                <h2 className="text-2xl font-black text-[#203971] mt-0.5 tracking-tight">{pengajuan.nomor_pengajuan}</h2>
                                <p className="text-xs text-gray-500 mt-1 font-mono">{new Date(pengajuan.created_at).toLocaleString('id-ID')} WIB</p>
                            </div>
                            
                            <div className="flex flex-col items-start md:items-end gap-1.5">
                                <span className="text-xs font-semibold text-gray-400 font-mono tracking-wider">STATUS SEKARANG</span>
                                <div className={`px-4 py-1.5 rounded-full text-xs font-black font-mono tracking-widest border uppercase ${getStatusColor(pengajuan.status)}`}>
                                    {pengajuan.status}
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
                                        width: pengajuan.status === 'Menunggu' ? '25%' : '100%'
                                    }}
                                ></div>

                                {/* Step 1: Submit */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-[#203971] text-white flex items-center justify-center shadow-sm">
                                        <span className="material-symbols-outlined text-sm">done</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600 mt-2 font-mono uppercase tracking-wider">Diajukan</span>
                                </div>

                                {/* Step 2: Process */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 ${
                                        pengajuan.status !== 'Menunggu'
                                            ? 'bg-[#203971] text-white border-[#203971]'
                                            : 'bg-white text-gray-400 border-gray-200'
                                    }`}>
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600 mt-2 font-mono uppercase tracking-wider">Direview</span>
                                </div>

                                {/* Step 3: Action */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 ${
                                        pengajuan.status === 'Disetujui'
                                            ? 'bg-emerald-500 text-white border-emerald-500'
                                            : pengajuan.status === 'Ditolak'
                                            ? 'bg-rose-500 text-white border-rose-500'
                                            : 'bg-white text-gray-400 border-gray-200'
                                    }`}>
                                        <span className="material-symbols-outlined text-sm">
                                            {pengajuan.status === 'Disetujui' ? 'check' : pengajuan.status === 'Ditolak' ? 'close' : 'check'}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600 mt-2 font-mono uppercase tracking-wider">
                                        {pengajuan.status === 'Ditolak' ? 'Ditolak' : 'Selesai'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Approval / Rejection Box */}
                        {pengajuan.status === 'Disetujui' && (
                            <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl text-center space-y-4 mb-2">
                                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                    <span className="material-symbols-outlined text-2xl">verified_user</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-emerald-800">Surat Pengajuan Anda Telah Disetujui</h4>
                                    <p className="text-xs text-emerald-600/80 mt-1">Silakan unduh dokumen PDF surat resmi Anda melalui tombol di bawah ini.</p>
                                </div>
                                {pengajuan.catatan && (
                                    <div className="bg-white/60 border border-emerald-200/50 rounded-lg p-3 text-xs text-emerald-900 text-left font-medium">
                                        <strong className="text-emerald-950 font-bold block mb-1">Catatan Asisten:</strong>
                                        {pengajuan.catatan}
                                    </div>
                                )}
                                <div className="pt-2">
                                    <a
                                        href={downloadUrl}
                                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-xs font-bold font-mono tracking-widest transition-colors shadow-sm"
                                    >
                                        <span className="material-symbols-outlined text-sm">download</span> UNDUH SURAT PDF
                                    </a>
                                </div>
                            </div>
                        )}

                        {pengajuan.status === 'Ditolak' && (
                            <div className="bg-rose-50 border border-rose-100 p-5 rounded-xl space-y-3 mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-rose-500/10 text-rose-600 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-lg">gpp_maybe</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-rose-800">Pengajuan Ditangguhkan / Ditolak</h4>
                                        <p className="text-xs text-rose-600/80 mt-0.5">Mohon tinjau alasan penolakan di bawah ini.</p>
                                    </div>
                                </div>
                                <div className="bg-white/60 border border-rose-200/50 rounded-lg p-3 text-xs text-rose-900 font-medium">
                                    <strong className="text-rose-950 font-bold block mb-1">Alasan Penolakan:</strong>
                                    {pengajuan.catatan || 'Tidak ada alasan khusus yang dicantumkan.'}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Submission Details */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-sm font-black font-mono text-[#203971] tracking-wider uppercase border-b border-gray-100 pb-3 mb-4">
                            RINCIAN PENGAJUAN
                        </h3>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            <div>
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Nama Lengkap</dt>
                                <dd className="font-bold text-gray-800 mt-1">{pengajuan.nama}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">NIM</dt>
                                <dd className="font-bold text-gray-800 mt-1 font-mono">{pengajuan.nim}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Mata Kuliah Praktikum</dt>
                                <dd className="font-medium text-gray-800 mt-1">{pengajuan.matkul}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Jenis Surat</dt>
                                <dd className="font-medium text-gray-800 mt-1">{pengajuan.jenis_surat}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Tanggal Praktikum</dt>
                                <dd className="font-medium text-gray-800 mt-1 font-mono">
                                    {new Date(pengajuan.tanggal_praktikum).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </dd>
                            </div>
                            {pengajuan.jenis_surat === 'Pindah Sesi' && (
                                <>
                                    <div>
                                        <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Sesi Asal</dt>
                                        <dd className="font-medium text-gray-800 mt-1">{pengajuan.sesi_asal}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Sesi Tujuan</dt>
                                        <dd className="font-medium text-gray-800 mt-1">{pengajuan.sesi_tujuan}</dd>
                                    </div>
                                </>
                            )}
                            <div className="sm:col-span-2">
                                <dt className="text-xs text-gray-400 font-mono tracking-wider uppercase">Alasan Pengajuan</dt>
                                <dd className="font-normal text-gray-600 mt-1 bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs leading-relaxed">
                                    {pengajuan.alasan}
                                </dd>
                            </div>
                        </dl>
                    </div>

                </div>
            </section>
        </AppLayout>
    );
}
