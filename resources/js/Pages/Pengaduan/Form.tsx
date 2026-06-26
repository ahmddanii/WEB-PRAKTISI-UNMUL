import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Form() {
    const { props } = usePage();
    const successTicket = (props.flash as any)?.success_ticket;

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [matkulList, setMatkulList] = useState<{ id: number; nama_mk: string }[]>([]);
    const [loadingMatkul, setLoadingMatkul] = useState(false);

    // List of angkatan dynamically generated (e.g. current year to 4 years back)
    const currentYear = new Date().getFullYear();
    const angkatanList = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const form = useForm({
        kategori: 'pengaduan',
        angkatan: '',
        mata_kuliah_id: '',
        isi_pengaduan: '',
        lampiran: null as File | null,
        nama_pelapor: '',
        nim_pelapor: '',
    });

    useEffect(() => {
        if (successTicket) {
            setShowSuccessModal(true);
        }
    }, [successTicket]);

    // Fetch Mata Kuliah when Angkatan changes
    useEffect(() => {
        if (!form.data.angkatan) {
            setMatkulList([]);
            form.setData('mata_kuliah_id', '');
            return;
        }

        setLoadingMatkul(true);
        fetch(`/api/matkul-by-angkatan?angkatan=${form.data.angkatan}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load');
                return res.json();
            })
            .then((data) => {
                setMatkulList(data);
                setLoadingMatkul(false);
            })
            .catch((err) => {
                console.error(err);
                setLoadingMatkul(false);
            });
    }, [form.data.angkatan]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/pengaduan', {
            forceFormData: true,
            onSuccess: () => {
                form.reset('isi_pengaduan', 'lampiran', 'nama_pelapor', 'nim_pelapor');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Pengaduan & Aspirasi - PRAKTISI" />

            <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-12 pb-24">
                <div className="max-w-2xl mx-auto px-6 md:px-8">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="font-mono text-xs font-bold text-[#455d97] uppercase tracking-widest bg-[#203971]/5 px-3 py-1.5 rounded-full">
                            ASPIRASI MAHASISWA
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#203971] mt-4 tracking-tight">
                            Pengaduan & Aspirasi
                        </h1>
                        <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
                            Saluran resmi bagi praktikan untuk menyampaikan keluhan, saran, atau masukan seputar kegiatan praktikum secara aman.
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm transition-all">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Kategori */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kategori Aspirasi</label>
                                <select
                                    value={form.data.kategori}
                                    onChange={(e) => form.setData('kategori', e.target.value)}
                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer"
                                >
                                    <option value="pengaduan">Pengaduan (Keluhan / Kendala)</option>
                                    <option value="aspirasi">Aspirasi / Masukan</option>
                                </select>
                                {form.errors.kategori && (
                                    <span className="text-red-500 text-xs mt-1 block">{form.errors.kategori}</span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Angkatan */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Angkatan Anda</label>
                                    <select
                                        value={form.data.angkatan}
                                        onChange={(e) => form.setData('angkatan', e.target.value)}
                                        required
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none cursor-pointer"
                                    >
                                        <option value="">Pilih Angkatan</option>
                                        {angkatanList.map((yr) => (
                                            <option key={yr} value={yr}>
                                                Angkatan {yr}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.angkatan && (
                                        <span className="text-red-500 text-xs mt-1 block">{form.errors.angkatan}</span>
                                    )}
                                </div>

                                {/* Mata Kuliah Terkait */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Mata Kuliah Terkait</label>
                                    <select
                                        value={form.data.mata_kuliah_id}
                                        onChange={(e) => form.setData('mata_kuliah_id', e.target.value)}
                                        disabled={!form.data.angkatan || loadingMatkul}
                                        className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none disabled:bg-gray-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        <option value="">
                                            {loadingMatkul ? 'Memuat mata kuliah...' : 'Umum / Tidak spesifik'}
                                        </option>
                                        {matkulList.map((mk) => (
                                            <option key={mk.id} value={mk.id}>
                                                {mk.nama_mk}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.mata_kuliah_id && (
                                        <span className="text-red-500 text-xs mt-1 block">{form.errors.mata_kuliah_id}</span>
                                    )}
                                </div>
                            </div>

                            {/* Isi Rincian Pengaduan */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Isi Rincian Pengaduan / Aspirasi</label>
                                <textarea
                                    value={form.data.isi_pengaduan}
                                    onChange={(e) => form.setData('isi_pengaduan', e.target.value)}
                                    required
                                    rows={6}
                                    placeholder="Jelaskan secara mendetail kendala, saran, atau pertanyaan yang ingin Anda sampaikan"
                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none resize-none"
                                />
                                {form.errors.isi_pengaduan && (
                                    <span className="text-red-500 text-xs mt-1 block">{form.errors.isi_pengaduan}</span>
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
                                            form.setData('lampiran', e.target.files[0]);
                                        }
                                    }}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#203971]/10 file:text-[#203971] hover:file:bg-[#203971]/20 cursor-pointer"
                                />
                                <p className="text-[11px] text-gray-400 mt-1">Maksimum ukuran file: 3MB (.pdf, .jpg, .jpeg, .png)</p>
                                {form.errors.lampiran && (
                                    <span className="text-red-500 text-xs mt-1 block">{form.errors.lampiran}</span>
                                )}
                            </div>

                            <div className="border-t border-gray-150 pt-5">
                                <h3 className="text-xs font-black font-mono tracking-widest text-[#203971] uppercase mb-4">
                                    Identitas Pengadu (Opsional)
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nama Pelapor */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={form.data.nama_pelapor}
                                            onChange={(e) => form.setData('nama_pelapor', e.target.value)}
                                            placeholder="Nama Anda"
                                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                        />
                                        {form.errors.nama_pelapor && (
                                            <span className="text-red-500 text-xs mt-1 block">{form.errors.nama_pelapor}</span>
                                        )}
                                    </div>

                                    {/* NIM Pelapor */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">NIM</label>
                                        <input
                                            type="text"
                                            value={form.data.nim_pelapor}
                                            onChange={(e) => form.setData('nim_pelapor', e.target.value)}
                                            placeholder="NIM Anda"
                                            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#203971] outline-none"
                                        />
                                        {form.errors.nim_pelapor && (
                                            <span className="text-red-500 text-xs mt-1 block">{form.errors.nim_pelapor}</span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-[11px] text-gray-400 mt-2.5">
                                    * Boleh dikosongkan. Pengaduan Anda tetap akan kami terima secara anonim.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="w-full bg-[#203971] hover:bg-[#182c57] text-white py-3 rounded-lg font-bold font-mono tracking-widest text-sm cursor-pointer transition-colors disabled:opacity-80"
                                >
                                    {form.processing ? 'MENGIRIMKAN...' : 'SUBMIT ASPIRASI'}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </section>

            {/* Success Dialog Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl text-center space-y-4 animate-scale-up">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-3xl">check_circle</span>
                        </div>
                        
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-gray-900">Pengaduan Berhasil Dikirim!</h3>
                            <p className="text-xs text-gray-500 font-mono">
                                Nomor Tiket: <span className="font-bold text-[#203971]">{successTicket}</span>
                            </p>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            Masukan Anda akan dikumpulkan dan dibahas pada rapat evaluasi aslab berikutnya sebagai bahan evaluasi bersama. Terima kasih atas kepedulian Anda!
                        </p>

                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full bg-[#203971] hover:bg-[#182c57] text-white py-2 rounded-lg font-bold font-mono text-xs tracking-wider cursor-pointer transition-colors"
                        >
                            TUTUP
                        </button>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
