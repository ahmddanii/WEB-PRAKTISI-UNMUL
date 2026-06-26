import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Form() {
    const { props } = usePage();
    const successPengajuan = (props.flash as any)?.success_pengajuan;

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [jadwalList, setJadwalList] = useState<{ value: string; label: string }[]>([]);
    const [loadingJadwal, setLoadingJadwal] = useState(false);
    const [matkulList, setMatkulList] = useState<{ id: number; nama_mk: string }[]>([]);
    const [loadingMatkul, setLoadingMatkul] = useState(false);

    const formCreate = useForm({
        nama: '',
        nim: '',
        email: '',
        no_hp: '',
        matkul: '',
        kelas_sesi: '',
        tanggal_praktikum: '',
        sesi_tujuan: '',
        alasan: '',
        file_bukti: null as File | null,
        request_pindah_sesi: false,
    });

    useEffect(() => {
        if (successPengajuan) {
            setShowSuccessModal(true);
        }
    }, [successPengajuan]);

    // Fetch courses dynamically when NIM changes (extracting batch/angkatan)
    useEffect(() => {
        const nimText = formCreate.data.nim.trim();
        if (nimText.length < 2) {
            setMatkulList([]);
            formCreate.setData('matkul', '');
            return;
        }

        const twoDigits = nimText.substring(0, 2);
        // Check if twoDigits are numbers
        if (!/^\d{2}$/.test(twoDigits)) {
            setMatkulList([]);
            formCreate.setData('matkul', '');
            return;
        }

        const angkatan = '20' + twoDigits;
        setLoadingMatkul(true);
        fetch(`/api/matkul-by-angkatan?angkatan=${angkatan}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load courses');
                return res.json();
            })
            .then((data) => {
                setMatkulList(data);
                setLoadingMatkul(false);
                
                // If current selected matkul is not in the new course list, reset it
                const exists = data.some((m: any) => m.nama_mk === formCreate.data.matkul);
                if (!exists) {
                    formCreate.setData('matkul', '');
                }
            })
            .catch((err) => {
                console.error(err);
                setLoadingMatkul(false);
                setMatkulList([]);
                formCreate.setData('matkul', '');
            });
    }, [formCreate.data.nim]);

    // Fetch available schedules when toggle is checked and course is selected
    useEffect(() => {
        if (!formCreate.data.request_pindah_sesi) {
            formCreate.setData('sesi_tujuan', '');
            setJadwalList([]);
            return;
        }

        if (!formCreate.data.matkul) {
            formCreate.setData('sesi_tujuan', '');
            setJadwalList([]);
            return;
        }

        setLoadingJadwal(true);
        fetch(`/api/jadwal-tersedia?matkul=${encodeURIComponent(formCreate.data.matkul)}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load schedules');
                return res.json();
            })
            .then((data) => {
                setJadwalList(data);
                setLoadingJadwal(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingJadwal(false);
                setJadwalList([]);
            });
    }, [formCreate.data.request_pindah_sesi, formCreate.data.matkul]);

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formCreate.post('/pengajuan-surat', {
            forceFormData: true,
            onSuccess: () => {
                formCreate.reset();
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Pengajuan Surat Izin - PRAKTISI" />

            <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-12 pb-24">
                <div className="max-w-2xl mx-auto px-6 md:px-8">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs font-bold text-[#455d97] uppercase tracking-widest bg-[#203971]/5 px-3 py-1.5 rounded-full">
                            LAYANAN DIGITAL
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#203971] mt-4 tracking-tight">
                            Pengajuan Surat Izin
                        </h1>
                        <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
                            Ajukan Surat Izin Tidak Hadir Praktikum secara cepat dan digital untuk ditinjau oleh asisten laboratorium.
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm transition-all">
                        <form onSubmit={handleCreateSubmit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nama Lengkap */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={formCreate.data.nama}
                                        onChange={(e) => formCreate.setData('nama', e.target.value)}
                                        required
                                        placeholder="Masukkan nama lengkap Anda"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    />
                                    {formCreate.errors.nama && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.nama}</span>
                                    )}
                                </div>

                                {/* NIM */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">NIM</label>
                                    <input
                                        type="text"
                                        value={formCreate.data.nim}
                                        onChange={(e) => formCreate.setData('nim', e.target.value)}
                                        required
                                        placeholder="Cth: 2409116000"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    />
                                    {formCreate.errors.nim && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.nim}</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Aktif</label>
                                    <input
                                        type="email"
                                        value={formCreate.data.email}
                                        onChange={(e) => formCreate.setData('email', e.target.value)}
                                        required
                                        placeholder="PDF surat dikirim ke email ini"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    />
                                    {formCreate.errors.email && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.email}</span>
                                    )}
                                </div>

                                {/* Nomor HP */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nomor HP / WhatsApp (Opsional)</label>
                                    <input
                                        type="text"
                                        value={formCreate.data.no_hp}
                                        onChange={(e) => formCreate.setData('no_hp', e.target.value)}
                                        placeholder="Cth: 08123456789"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    />
                                    {formCreate.errors.no_hp && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.no_hp}</span>
                                    )}
                                </div>
                            </div>

                            <hr className="border-gray-150" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Mata Kuliah */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mata Kuliah Praktikum</label>
                                    <select
                                        value={formCreate.data.matkul}
                                        onChange={(e) => formCreate.setData('matkul', e.target.value)}
                                        required
                                        disabled={formCreate.data.nim.trim().length < 2 || loadingMatkul}
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                                    >
                                        {formCreate.data.nim.trim().length < 2 ? (
                                            <option value="">Masukkan NIM terlebih dahulu</option>
                                        ) : loadingMatkul ? (
                                            <option value="">Memuat mata kuliah...</option>
                                        ) : matkulList.length === 0 ? (
                                            <option value="">Tidak ada mata kuliah ditemukan untuk angkatan Anda</option>
                                        ) : (
                                            <>
                                                <option value="">Pilih Mata Kuliah Praktikum</option>
                                                {matkulList.map((m) => (
                                                    <option key={m.id} value={m.nama_mk}>
                                                        {m.nama_mk}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                    {formCreate.errors.matkul && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.matkul}</span>
                                    )}
                                </div>

                                {/* Kelas / Sesi Saat Ini */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kelas / Sesi Saat Ini</label>
                                    <input
                                        type="text"
                                        value={formCreate.data.kelas_sesi}
                                        onChange={(e) => formCreate.setData('kelas_sesi', e.target.value)}
                                        required
                                        placeholder="Cth: Kelas A"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    />
                                    {formCreate.errors.kelas_sesi && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.kelas_sesi}</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Tanggal Praktikum */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Tanggal Praktikum</label>
                                    <input
                                        type="date"
                                        value={formCreate.data.tanggal_praktikum}
                                        onChange={(e) => formCreate.setData('tanggal_praktikum', e.target.value)}
                                        required
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    />
                                    {formCreate.errors.tanggal_praktikum && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.tanggal_praktikum}</span>
                                    )}
                                </div>

                                {/* Request Pindah Sesi Toggle */}
                                <div className="flex flex-col justify-center">
                                    <label className="flex items-center gap-3 cursor-pointer mt-5">
                                        <input
                                            type="checkbox"
                                            checked={formCreate.data.request_pindah_sesi}
                                            onChange={(e) => formCreate.setData('request_pindah_sesi', e.target.checked)}
                                            className="w-5 h-5 rounded text-[#203971] focus:ring-[#203971] cursor-pointer"
                                        />
                                        <div>
                                            <span className="text-sm font-bold text-gray-700">Request Pindah Sesi?</span>
                                            <p className="text-[10px] text-gray-400 font-normal">Ajukan kepindahan jadwal ke sesi lainnya</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Conditional Sesi Tujuan Dropdown */}
                            {formCreate.data.request_pindah_sesi && (
                                <div className="animate-fade-in bg-gray-50 border border-gray-150 p-4 rounded-xl space-y-2">
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Pilih Sesi Tujuan</label>
                                    <select
                                        value={formCreate.data.sesi_tujuan}
                                        onChange={(e) => formCreate.setData('sesi_tujuan', e.target.value)}
                                        required={formCreate.data.request_pindah_sesi}
                                        disabled={!formCreate.data.matkul || loadingJadwal}
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                        {!formCreate.data.matkul ? (
                                            <option value="">Pilih mata kuliah terlebih dahulu</option>
                                        ) : loadingJadwal ? (
                                            <option value="">Memuat jadwal kelas...</option>
                                        ) : jadwalList.length === 0 ? (
                                            <option value="">Tidak ada jadwal pindahan/susulan yang tersedia</option>
                                        ) : (
                                            <>
                                                <option value="">Pilih jadwal sesi tujuan</option>
                                                {jadwalList.map((item) => (
                                                    <option key={item.value} value={item.label}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                    {formCreate.errors.sesi_tujuan && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.sesi_tujuan}</span>
                                    )}
                                </div>
                            )}

                            {/* Alasan */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Alasan Pengajuan</label>
                                <textarea
                                    value={formCreate.data.alasan}
                                    onChange={(e) => formCreate.setData('alasan', e.target.value)}
                                    required
                                    rows={4}
                                    placeholder="Tuliskan alasan lengkap Anda mengajukan izin ini"
                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none resize-none"
                                />
                                {formCreate.errors.alasan && (
                                    <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.alasan}</span>
                                )}
                            </div>

                            {/* File Bukti */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Dokumen Bukti Pendukung (Wajib)</label>
                                <input
                                    type="file"
                                    accept=".pdf,image/*"
                                    required
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            formCreate.setData('file_bukti', e.target.files[0]);
                                        }
                                    }}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#203971]/10 file:text-[#203971] hover:file:bg-[#203971]/20 cursor-pointer"
                                />
                                <p className="text-[11px] text-gray-400 mt-1">Format file: .pdf, .jpg, .jpeg, .png (Maks 2MB) &bull; Berkas ini wajib diunggah.</p>
                                {formCreate.errors.file_bukti && (
                                    <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.file_bukti}</span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={formCreate.processing}
                                    className="w-full bg-[#203971] hover:bg-[#182c57] text-white py-3 rounded-lg font-bold font-mono tracking-widest text-sm cursor-pointer transition-colors disabled:opacity-80"
                                >
                                    {formCreate.processing ? 'MENGIRIMKAN...' : 'SUBMIT PENGAJUAN'}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </section>

            {/* Success Modal */}
            {showSuccessModal && successPengajuan && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl text-center space-y-4 animate-scale-up">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-3xl">check_circle</span>
                        </div>
                        
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-gray-900">Pengajuan Berhasil Dikirim!</h3>
                            <p className="text-xs text-gray-500 font-mono">
                                Nomor Pengajuan: <span className="font-bold text-[#203971]">{successPengajuan.nomor_pengajuan}</span>
                            </p>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            Pengajuan surat izin atas nama <strong>{successPengajuan.nama}</strong> telah diterima. Admin asisten laboratorium akan meninjau berkas Anda. Jika disetujui, surat keputusan resmi akan dikirim otomatis ke email Anda:
                            <br />
                            <strong className="text-slate-800">📧 {successPengajuan.email}</strong>
                        </p>

                        <button
                            onClick={() => {
                                setShowSuccessModal(false);
                                // Refresh / reset URL
                                window.location.href = '/';
                            }}
                            className="w-full bg-[#203971] hover:bg-[#182c57] text-white py-2.5 rounded-lg font-bold font-mono text-xs tracking-widest cursor-pointer transition-colors"
                        >
                            KEMBALI KE BERANDA
                        </button>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
