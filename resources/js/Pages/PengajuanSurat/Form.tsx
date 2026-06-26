import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Form() {
    const [activeTab, setActiveTab] = useState<'create' | 'check'>('create');

    // 1. Form Pengajuan Baru
    const formCreate = useForm({
        jenis_surat: 'Izin Tidak Hadir',
        nama: '',
        nim: '',
        email: '',
        no_hp: '',
        matkul: '',
        kelas_sesi: '',
        tanggal_praktikum: '',
        sesi_asal: '',
        sesi_tujuan: '',
        alasan: '',
        file_bukti: null as File | null,
    });

    // 2. Form Cek Status
    const formCheck = useForm({
        nim: '',
        nomor_pengajuan: '',
    });

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formCreate.post('/pengajuan-surat', {
            forceFormData: true,
            onSuccess: () => formCreate.reset(),
        });
    };

    const handleCheckSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formCheck.post('/pengajuan-surat/cek-status');
    };

    return (
        <AppLayout>
            <Head title="Pengajuan Surat - PRAKTISI" />

            <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-12 pb-24">
                <div className="max-w-3xl mx-auto px-6 md:px-8">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs font-bold text-[#455d97] uppercase tracking-widest bg-[#203971]/5 px-3 py-1.5 rounded-full">
                            LAYANAN DIGITAL
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#203971] mt-4 tracking-tight">
                            Pengajuan Surat
                        </h1>
                        <p className="text-gray-500 mt-3 text-base max-w-lg mx-auto">
                            Ajukan Surat Izin Tidak Hadir atau Permohonan Sesi Pindah Praktikum Anda secara cepat & digital.
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex bg-gray-100 p-1.5 rounded-xl mb-8 border border-gray-200">
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`flex-1 py-3 text-sm font-bold font-mono tracking-wider rounded-lg transition-all cursor-pointer ${
                                activeTab === 'create'
                                    ? 'bg-[#203971] text-white shadow-sm'
                                    : 'text-gray-600 hover:text-[#203971]'
                            }`}
                        >
                            BUAT PENGAJUAN
                        </button>
                        <button
                            onClick={() => setActiveTab('check')}
                            className={`flex-1 py-3 text-sm font-bold font-mono tracking-wider rounded-lg transition-all cursor-pointer ${
                                activeTab === 'check'
                                    ? 'bg-[#203971] text-white shadow-sm'
                                    : 'text-gray-600 hover:text-[#203971]'
                            }`}
                        >
                            CEK STATUS
                        </button>
                    </div>

                    {/* Tab 1: Buat Pengajuan Baru */}
                    {activeTab === 'create' && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm transition-all">
                            <form onSubmit={handleCreateSubmit} className="space-y-6">
                                
                                {/* Jenis Surat */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Jenis Pengajuan Surat</label>
                                    <select
                                        value={formCreate.data.jenis_surat}
                                        onChange={(e) => formCreate.setData('jenis_surat', e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    >
                                        <option value="Izin Tidak Hadir">Surat Izin Tidak Hadir Praktikum</option>
                                        <option value="Pindah Sesi">Surat Permohonan Perpindahan Sesi</option>
                                    </select>
                                    {formCreate.errors.jenis_surat && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.jenis_surat}</span>
                                    )}
                                </div>

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
                                            placeholder="Notifikasi surat dikirim ke sini"
                                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                        />
                                        {formCreate.errors.email && (
                                            <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.email}</span>
                                        )}
                                    </div>

                                    {/* Nomor HP */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nomor HP / WhatsApp</label>
                                        <input
                                            type="text"
                                            value={formCreate.data.no_hp || ''}
                                            onChange={(e) => formCreate.setData('no_hp', e.target.value)}
                                            placeholder="Cth: 08123456789"
                                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                        />
                                        {formCreate.errors.no_hp && (
                                            <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.no_hp}</span>
                                        )}
                                    </div>
                                </div>

                                <hr className="border-gray-100" />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Mata Kuliah */}
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mata Kuliah Praktikum</label>
                                        <input
                                            type="text"
                                            value={formCreate.data.matkul}
                                            onChange={(e) => formCreate.setData('matkul', e.target.value)}
                                            required
                                            placeholder="Cth: Desain Kependudukan & Sistem Informasi"
                                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                        />
                                        {formCreate.errors.matkul && (
                                            <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.matkul}</span>
                                        )}
                                    </div>

                                    {/* Kelas / Sesi */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kelas / Sesi</label>
                                        <input
                                            type="text"
                                            value={formCreate.data.kelas_sesi || ''}
                                            onChange={(e) => formCreate.setData('kelas_sesi', e.target.value)}
                                            placeholder="Cth: Kelas A / Sesi 2"
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

                                    {/* Conditional Pindah Sesi Inputs */}
                                    {formCreate.data.jenis_surat === 'Pindah Sesi' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Sesi Asal</label>
                                                <input
                                                    type="text"
                                                    value={formCreate.data.sesi_asal || ''}
                                                    onChange={(e) => formCreate.setData('sesi_asal', e.target.value)}
                                                    required
                                                    placeholder="Cth: Sesi 1"
                                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                                />
                                                {formCreate.errors.sesi_asal && (
                                                    <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.sesi_asal}</span>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Sesi Tujuan</label>
                                                <input
                                                    type="text"
                                                    value={formCreate.data.sesi_tujuan || ''}
                                                    onChange={(e) => formCreate.setData('sesi_tujuan', e.target.value)}
                                                    required
                                                    placeholder="Cth: Sesi 3"
                                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                                />
                                                {formCreate.errors.sesi_tujuan && (
                                                    <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.sesi_tujuan}</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Alasan */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Alasan Pengajuan</label>
                                    <textarea
                                        value={formCreate.data.alasan}
                                        onChange={(e) => formCreate.setData('alasan', e.target.value)}
                                        required
                                        rows={4}
                                        placeholder="Tuliskan alasan lengkap Anda mengajukan surat ini"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none resize-none"
                                    />
                                    {formCreate.errors.alasan && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.alasan}</span>
                                    )}
                                </div>

                                {/* File Bukti */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Dokumen Bukti Pendukung (Opsional)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                formCreate.setData('file_bukti', e.target.files[0]);
                                            }
                                        }}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#203971]/10 file:text-[#203971] hover:file:bg-[#203971]/20 cursor-pointer"
                                    />
                                    <p className="text-[11px] text-gray-400 mt-1">Maksimum ukuran file: 2MB (.pdf, .jpg, .jpeg, .png)</p>
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
                    )}

                    {/* Tab 2: Cek Status Pengajuan */}
                    {activeTab === 'check' && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm transition-all max-w-md mx-auto">
                            <form onSubmit={handleCheckSubmit} className="space-y-5">
                                
                                <div className="text-center mb-4">
                                    <span className="material-symbols-outlined text-gray-400 text-5xl">manage_search</span>
                                    <h3 className="text-lg font-bold text-[#203971] mt-2">Lacak Status Surat</h3>
                                    <p className="text-xs text-gray-500 mt-1">Masukkan NIM & nomor pengajuan Anda</p>
                                </div>

                                {formCheck.errors.error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg font-medium">
                                        {formCheck.errors.error}
                                    </div>
                                )}

                                {/* NIM */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">NIM Anda</label>
                                    <input
                                        type="text"
                                        value={formCheck.data.nim}
                                        onChange={(e) => formCheck.setData('nim', e.target.value)}
                                        required
                                        placeholder="Cth: 2409116000"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    />
                                    {formCheck.errors.nim && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCheck.errors.nim}</span>
                                    )}
                                </div>

                                {/* Nomor Pengajuan */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nomor Pengajuan</label>
                                    <input
                                        type="text"
                                        value={formCheck.data.nomor_pengajuan}
                                        onChange={(e) => formCheck.setData('nomor_pengajuan', e.target.value)}
                                        required
                                        placeholder="Cth: #P00001"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    />
                                    {formCheck.errors.nomor_pengajuan && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCheck.errors.nomor_pengajuan}</span>
                                    )}
                                </div>

                                {/* Submit button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={formCheck.processing}
                                        className="w-full bg-[#203971] hover:bg-[#182c57] text-white py-3 rounded-lg font-bold font-mono tracking-widest text-sm cursor-pointer transition-colors disabled:opacity-80"
                                    >
                                        {formCheck.processing ? 'MENCARI...' : 'CARI DATA'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    )}

                </div>
            </section>
        </AppLayout>
    );
}
