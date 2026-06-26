import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Form() {
    const [activeTab, setActiveTab] = useState<'create' | 'check'>('create');

    // 1. Form Pengaduan Baru
    const formCreate = useForm({
        kategori: 'Keluhan',
        nama: '',
        nim: '',
        email: '',
        no_hp: '',
        matkul_terkait: '',
        judul: '',
        isi: '',
        lampiran: null as File | null,
    });

    // 2. Form Cek Status Tiket
    const formCheck = useForm({
        nim: '',
        nomor_tiket: '',
    });

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formCreate.post('/pengaduan', {
            forceFormData: true,
            onSuccess: () => formCreate.reset(),
        });
    };

    const handleCheckSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formCheck.post('/pengaduan/cek-status');
    };

    return (
        <AppLayout>
            <Head title="Pengaduan & Aspirasi - PRAKTISI" />

            <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-12 pb-24">
                <div className="max-w-3xl mx-auto px-6 md:px-8">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs font-bold text-[#455d97] uppercase tracking-widest bg-[#203971]/5 px-3 py-1.5 rounded-full">
                            ASPIRASI MAHASISWA
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#203971] mt-4 tracking-tight">
                            Pengaduan & Aspirasi
                        </h1>
                        <p className="text-gray-500 mt-3 text-base max-w-lg mx-auto">
                            Saluran resmi bagi mahasiswa untuk menyampaikan keluhan, saran, pertanyaan, atau kendala seputar kegiatan praktikum.
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
                            KIRIM PENGADUAN
                        </button>
                        <button
                            onClick={() => setActiveTab('check')}
                            className={`flex-1 py-3 text-sm font-bold font-mono tracking-wider rounded-lg transition-all cursor-pointer ${
                                activeTab === 'check'
                                    ? 'bg-[#203971] text-white shadow-sm'
                                    : 'text-gray-600 hover:text-[#203971]'
                            }`}
                        >
                            LACAK TIKET
                        </button>
                    </div>

                    {/* Tab 1: Form Pengaduan Baru */}
                    {activeTab === 'create' && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm transition-all">
                            <form onSubmit={handleCreateSubmit} className="space-y-6">
                                
                                {/* Kategori */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kategori Aspirasi</label>
                                    <select
                                        value={formCreate.data.kategori}
                                        onChange={(e) => formCreate.setData('kategori', e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    >
                                        <option value="Keluhan">Keluhan (Kendala/Masalah)</option>
                                        <option value="Saran">Saran (Masukan konstruktif)</option>
                                        <option value="Pertanyaan">Pertanyaan (Informasi/Konfirmasi)</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    {formCreate.errors.kategori && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.kategori}</span>
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
                                            placeholder="Notifikasi respons dikirim ke email ini"
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

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Judul Pengaduan */}
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Judul Pengaduan / Masalah</label>
                                        <input
                                            type="text"
                                            value={formCreate.data.judul}
                                            onChange={(e) => formCreate.setData('judul', e.target.value)}
                                            required
                                            placeholder="Ringkasan singkat keluhan/saran Anda"
                                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                        />
                                        {formCreate.errors.judul && (
                                            <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.judul}</span>
                                        )}
                                    </div>

                                    {/* Matkul Terkait */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mata Kuliah Terkait (Opsional)</label>
                                        <input
                                            type="text"
                                            value={formCreate.data.matkul_terkait}
                                            onChange={(e) => formCreate.setData('matkul_terkait', e.target.value)}
                                            placeholder="Cth: Rekayasa Perangkat Lunak"
                                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                        />
                                        {formCreate.errors.matkul_terkait && (
                                            <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.matkul_terkait}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Isi Pengaduan */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Rincian Pengaduan / Aspirasi</label>
                                    <textarea
                                        value={formCreate.data.isi}
                                        onChange={(e) => formCreate.setData('isi', e.target.value)}
                                        required
                                        rows={6}
                                        placeholder="Jelaskan secara mendetail kendala, saran, atau pertanyaan yang ingin Anda sampaikan"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none resize-none"
                                    />
                                    {formCreate.errors.isi && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.isi}</span>
                                    )}
                                </div>

                                {/* Lampiran */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">File Lampiran / Bukti (Opsional)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                formCreate.setData('lampiran', e.target.files[0]);
                                            }
                                        }}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#203971]/10 file:text-[#203971] hover:file:bg-[#203971]/20 cursor-pointer"
                                    />
                                    <p className="text-[11px] text-gray-400 mt-1">Maksimum ukuran file: 3MB (.pdf, .jpg, .jpeg, .png)</p>
                                    {formCreate.errors.lampiran && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCreate.errors.lampiran}</span>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={formCreate.processing}
                                        className="w-full bg-[#203971] hover:bg-[#182c57] text-white py-3 rounded-lg font-bold font-mono tracking-widest text-sm cursor-pointer transition-colors disabled:opacity-80"
                                    >
                                        {formCreate.processing ? 'MENGIRIMKAN...' : 'SUBMIT ASPIRASI'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    )}

                    {/* Tab 2: Lacak Tiket Pengaduan */}
                    {activeTab === 'check' && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm transition-all max-w-md mx-auto">
                            <form onSubmit={handleCheckSubmit} className="space-y-5">
                                
                                <div className="text-center mb-4">
                                    <span className="material-symbols-outlined text-gray-400 text-5xl">support_agent</span>
                                    <h3 className="text-lg font-bold text-[#203971] mt-2">Lacak Tiket Pengaduan</h3>
                                    <p className="text-xs text-gray-500 mt-1">Masukkan NIM & nomor tiket Anda</p>
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

                                {/* Nomor Tiket */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nomor Tiket</label>
                                    <input
                                        type="text"
                                        value={formCheck.data.nomor_tiket}
                                        onChange={(e) => formCheck.setData('nomor_tiket', e.target.value)}
                                        required
                                        placeholder="Cth: #T00001"
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                    />
                                    {formCheck.errors.nomor_tiket && (
                                        <span className="text-red-500 text-xs mt-1 block">{formCheck.errors.nomor_tiket}</span>
                                    )}
                                </div>

                                {/* Submit button */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={formCheck.processing}
                                        className="w-full bg-[#203971] hover:bg-[#182c57] text-white py-3 rounded-lg font-bold font-mono tracking-widest text-sm cursor-pointer transition-colors disabled:opacity-80"
                                    >
                                        {formCheck.processing ? 'MENCARI TIKET...' : 'CARI TIKET'}
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
