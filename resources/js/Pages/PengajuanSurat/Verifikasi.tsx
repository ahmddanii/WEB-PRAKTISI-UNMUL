import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface VerifikasiProps {
    surat: {
        id: number;
        nomor_pengajuan: string;
        jenis_surat: string;
        nama: string;
        nim: string;
        email: string;
        matkul: string;
        kelas_sesi?: string;
        tanggal_praktikum: string;
        sesi_asal?: string;
        sesi_tujuan?: string;
        alasan: string;
        file_surat?: string;
        status: string;
        token?: string;
        diproses_at?: string;
    } | null;
    downloadUrl: string | null;
}

export default function Verifikasi({ surat, downloadUrl }: VerifikasiProps) {
    const formattedTanggal = surat
        ? new Date(surat.tanggal_praktikum).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : '';

    const formattedDiproses = surat && surat.diproses_at
        ? new Date(surat.diproses_at).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : '';

    return (
        <div className="bg-[#f3f4f6] text-[#1a1c1c] min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12 px-4">
            <Head title={surat ? "Verifikasi Surat Resmi - PRAKTISI" : "Dokumen Tidak Valid"} />

            {/* Premium Mesh Background */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#86DFCA] rounded-full blur-[140px] -mr-40 -mt-40 opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#203971] rounded-full blur-[140px] -ml-40 -mb-40 opacity-15"></div>
            </div>

            <div className="w-full max-w-[540px] z-10">
                {/* Header Logo */}
                <div className="flex flex-col items-center mb-8">
                    <img 
                        src="/images/logo.png" 
                        alt="PRAKTISI Logo" 
                        className="h-16 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform" 
                    />
                    <span className="font-mono text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">
                        Sistem Informasi Universitas Mulawarman
                    </span>
                </div>

                {surat ? (
                    /* VALID SCENARIO */
                    <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform scale-100">
                        {/* Status Header Badge */}
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-8 text-center text-white relative">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 animate-bounce">
                                <span className="material-symbols-outlined text-4xl text-white">verified_user</span>
                            </div>
                            <h2 className="text-xl font-extrabold uppercase tracking-wider font-sans">
                                Dokumen Sah & Terverifikasi
                            </h2>
                            <p className="text-white/80 text-xs font-mono mt-1">
                                No. Pengajuan: {surat.nomor_pengajuan}
                            </p>
                        </div>

                        {/* Document Info Body */}
                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="border-b border-gray-150 pb-4">
                                <span className="text-[10px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-1">
                                    Jenis Dokumen Resmi
                                </span>
                                <h3 className="text-base font-extrabold text-[#203971]">
                                    Surat Keterangan Izin Tidak Hadir Praktikum
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-0.5">
                                        Nama Lengkap
                                    </span>
                                    <p className="text-sm font-bold text-gray-800">{surat.nama}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-0.5">
                                        NIM
                                    </span>
                                    <p className="text-sm font-bold text-gray-800 font-mono">{surat.nim}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <span className="text-[10px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-0.5">
                                        Mata Kuliah
                                    </span>
                                    <p className="text-sm font-semibold text-gray-800">{surat.matkul}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-0.5">
                                        Kelas / Sesi
                                    </span>
                                    <p className="text-sm font-semibold text-gray-700">{surat.kelas_sesi || '-'}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 font-mono tracking-widest uppercase block mb-0.5">
                                        Tanggal Izin
                                    </span>
                                    <p className="text-sm font-semibold text-gray-700">{formattedTanggal}</p>
                                </div>

                                {surat.sesi_tujuan && (
                                    <div className="sm:col-span-2 bg-blue-50/50 border border-blue-100 p-3 rounded-xl mt-1">
                                        <span className="text-[9px] font-bold text-[#203971]/80 font-mono tracking-widest uppercase block mb-1">
                                            Rincian Pindah Sesi
                                        </span>
                                        <div className="flex items-center gap-2 text-xs font-bold text-[#203971]">
                                            <span>Sesi Asal: {surat.sesi_asal}</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            <span>Sesi Tujuan: {surat.sesi_tujuan}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 border border-gray-150 p-4 rounded-xl space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-bold font-mono tracking-wide text-gray-400 uppercase">
                                    <span>Tanda Tangan Elektronik</span>
                                    <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                                        <span className="material-symbols-outlined text-xs">check_circle</span> SECURE QR
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                    Surat ini sah secara hukum dan telah ditandatangani secara elektronik oleh Ketua PI PRAKTISI Sistem Informasi Unmul pada <span className="font-bold text-gray-800">{formattedDiproses}</span>.
                                </p>
                            </div>

                            {/* Download Button */}
                            {downloadUrl && (
                                <div className="pt-2">
                                    <a
                                        href={downloadUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-[#203971] hover:bg-[#152a55] text-white py-3.5 rounded-xl font-bold font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#203971]/25 hover:shadow-xl hover:shadow-[#203971]/35 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-base">download</span>
                                        UNDUH DOKUMEN PDF RESMI
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* INVALID SCENARIO */
                    <div className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                        {/* Status Header Badge */}
                        <div className="bg-gradient-to-r from-rose-500 to-red-600 px-6 py-8 text-center text-white relative">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                                <span className="material-symbols-outlined text-4xl text-white">gpp_maybe</span>
                            </div>
                            <h2 className="text-xl font-extrabold uppercase tracking-wider font-sans">
                                Dokumen Tidak Valid
                            </h2>
                            <p className="text-white/80 text-xs font-mono mt-1">
                                Verifikasi Sistem Gagal
                            </p>
                        </div>

                        {/* Document Info Body */}
                        <div className="p-6 sm:p-8 text-center space-y-6">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Mohon maaf, kode verifikasi atau tanda tangan digital ini <span className="font-bold text-rose-600">tidak terdaftar</span> dalam database resmi PRAKTISI Sistem Informasi Universitas Mulawarman.
                            </p>

                            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-left text-xs font-medium text-rose-800 flex gap-2">
                                <span className="material-symbols-outlined text-lg shrink-0">info</span>
                                <div>
                                    <strong className="block mb-0.5">Kemungkinan Penyebab:</strong>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Token verifikasi surat telah dimodifikasi atau salah.</li>
                                        <li>Pengajuan surat ditolak atau belum disetujui admin.</li>
                                        <li>Dokumen bukan diterbitkan oleh sistem resmi PRAKTISI.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Link
                                    href="/"
                                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-bold font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-base">home</span>
                                    KEMBALI KE BERANDA
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Copyright */}
                <div className="text-center mt-8 text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                    &copy; {new Date().getFullYear()} PRAKTISI Sistem Informasi Unmul. All Rights Reserved.
                </div>
            </div>
        </div>
    );
}
