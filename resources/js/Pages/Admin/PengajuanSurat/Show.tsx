import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface PengajuanProps {
  surat: {
    id: number;
    nomor_pengajuan: string;
    jenis_surat: string;
    nama: string;
    nim: string;
    email: string;
    no_hp?: string;
    matkul: string;
    kelas_sesi?: string;
    tanggal_praktikum: string;
    sesi_asal?: string;
    sesi_tujuan?: string;
    alasan: string;
    file_bukti?: string;
    file_surat?: string;
    status: 'Menunggu' | 'Disetujui' | 'Ditolak';
    catatan?: string;
    created_at: string;
  };
  buktiUrl?: string;
  suratUrl?: string;
}

export default function Show({ surat, buktiUrl, suratUrl }: PengajuanProps) {
  const [action, setAction] = useState<'none' | 'approve' | 'reject'>('none');

  const fileBuktiName = surat.file_bukti || '';
  const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(fileBuktiName);
  const isPdf = /\.pdf$/i.test(fileBuktiName);

  // Form Approve
  const formApprove = useForm({
    catatan: '',
  });

  // Form Reject
  const formReject = useForm({
    catatan: '',
  });

  const handleApproveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formApprove.post(`/admin/pengajuan-surat/${surat.id}/approve`, {
      onSuccess: () => setAction('none'),
    });
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formReject.post(`/admin/pengajuan-surat/${surat.id}/reject`, {
      onSuccess: () => setAction('none'),
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
      title={`Detail Pengajuan ${surat.nomor_pengajuan}`}
      subtitle="Tinjau berkas alasan pengajuan dan tindak lanjuti permohonan."
    >
      <Head title={`Detail Pengajuan ${surat.nomor_pengajuan}`} />

      <section className="p-8 max-w-4xl">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/admin/pengajuan-surat"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#203971] transition-colors font-mono tracking-wider"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>{' '}
            KEMBALI KE LIST
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Detail Info (Col Span 2) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-mono text-xs font-bold text-[#203971] tracking-widest uppercase border-b border-gray-100 pb-3 mb-4">
                RINCIAN MAHASISWA & MATAKULIAH
              </h3>

              <dl className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <dt className="text-gray-400 font-mono tracking-wider uppercase">
                    Nama Lengkap
                  </dt>
                  <dd className="font-bold text-gray-800 mt-1">{surat.nama}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 font-mono tracking-wider uppercase">
                    NIM
                  </dt>
                  <dd className="font-bold text-gray-800 mt-1 font-mono">
                    {surat.nim}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-400 font-mono tracking-wider uppercase">
                    Email
                  </dt>
                  <dd className="font-medium text-gray-800 mt-1 font-mono">
                    {surat.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-400 font-mono tracking-wider uppercase">
                    No. HP / WhatsApp
                  </dt>
                  <dd className="font-medium text-gray-800 mt-1 font-mono">
                    {surat.no_hp || '-'}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-gray-400 font-mono tracking-wider uppercase">
                    Mata Kuliah Praktikum
                  </dt>
                  <dd className="font-bold text-gray-800 mt-1">
                    {surat.matkul}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-400 font-mono tracking-wider uppercase">
                    Kelas / Sesi
                  </dt>
                  <dd className="font-medium text-gray-800 mt-1">
                    {surat.kelas_sesi || '-'}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-400 font-mono tracking-wider uppercase">
                    Tanggal Praktikum
                  </dt>
                  <dd className="font-medium text-gray-800 mt-1 font-mono">
                    {new Date(surat.tanggal_praktikum).toLocaleDateString(
                      'id-ID',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-mono text-xs font-bold text-[#203971] tracking-widest uppercase border-b border-gray-100 pb-3 mb-4">
                ISI ALASAN & BUKTI PENDUKUNG
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 font-mono tracking-wider uppercase block mb-1">
                    Alasan Diajukan:
                  </span>
                  <p className="text-sm bg-gray-50 border border-gray-100 rounded-lg p-4 font-normal text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {surat.alasan}
                  </p>
                </div>

                {surat.jenis_surat === 'Pindah Sesi' && (
                  <div className="grid grid-cols-2 gap-4 bg-blue-50/50 border border-blue-100 p-4 rounded-lg">
                    <div>
                      <span className="text-xs text-gray-400 font-mono tracking-wider uppercase">
                        Sesi Asal
                      </span>
                      <p className="text-sm font-bold text-[#203971] mt-0.5">
                        {surat.sesi_asal}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-mono tracking-wider uppercase">
                        Sesi Tujuan
                      </span>
                      <p className="text-sm font-bold text-[#203971] mt-0.5">
                        {surat.sesi_tujuan}
                      </p>
                    </div>
                  </div>
                )}

                {buktiUrl ? (
                  <div className="pt-2 space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-xs text-gray-500 font-mono tracking-wider uppercase font-bold">
                        Berkas Bukti Mahasiswa:
                      </span>
                      <a
                        href={buktiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#203971] hover:underline font-mono"
                      >
                        <span className="material-symbols-outlined text-sm">
                          open_in_new
                        </span>{' '}
                        Buka di Tab Baru
                      </a>
                    </div>

                    {isImage && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-2">
                        <img
                          src={buktiUrl}
                          alt="Bukti Mahasiswa"
                          className="max-w-full h-auto max-h-[500px] rounded mx-auto object-contain"
                        />
                      </div>
                    )}

                    {isPdf && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-[500px]">
                        <iframe
                          src={buktiUrl}
                          className="w-full h-full border-0"
                          title="Bukti Mahasiswa PDF"
                        />
                      </div>
                    )}

                    {!isImage && !isPdf && (
                      <div className="bg-gray-50 border border-gray-100 p-4 rounded text-xs">
                        <a
                          href={buktiUrl}
                          className="inline-flex items-center gap-2 font-bold text-[#203971] hover:underline font-mono"
                        >
                          <span className="material-symbols-outlined text-sm">
                            download
                          </span>{' '}
                          UNDUH BERKAS BUKTI MAHASISWA
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    Tidak ada lampiran berkas bukti pendukung.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions / Status */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-mono text-xs font-bold text-[#203971] tracking-widest uppercase border-b border-gray-100 pb-3 mb-4">
                STATUS VERIFIKASI
              </h3>

              <div className="text-center py-4 space-y-4">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-xs font-black font-mono tracking-widest border uppercase ${getStatusStyle(surat.status)}`}
                >
                  {surat.status}
                </span>

                {surat.status === 'Menunggu' && action === 'none' && (
                  <div className="flex flex-col gap-2 pt-2">
                    <a
                      href={`/admin/pengajuan-surat/${surat.id}/preview`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded font-bold font-mono tracking-wider text-xs cursor-pointer transition-colors shadow-sm block text-center flex items-center justify-center gap-1.5"
                    >
                      <span
                        className="material-symbols-outlined text-sm"
                        style={{ fontSize: '16px' }}
                      >
                        visibility
                      </span>
                      PRATINJAU SURAT (PREVIEW)
                    </a>
                    <button
                      onClick={() => setAction('approve')}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded font-bold font-mono tracking-wider text-xs cursor-pointer transition-colors shadow-sm"
                    >
                      SETUJUI & GENERATE SURAT
                    </button>
                    <button
                      onClick={() => setAction('reject')}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded font-bold font-mono tracking-wider text-xs cursor-pointer transition-colors shadow-sm"
                    >
                      TOLAK PENGAJUAN
                    </button>
                  </div>
                )}

                {surat.status === 'Disetujui' && (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded text-left text-xs space-y-3 font-medium">
                    <div>
                      <strong className="text-emerald-950 font-bold block mb-1">
                        Catatan Admin:
                      </strong>
                      <p className="text-gray-700 italic">
                        {surat.catatan || 'Tidak ada catatan.'}
                      </p>
                    </div>
                    {suratUrl && (
                      <div className="pt-1">
                        <a
                          href={suratUrl}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline font-mono"
                        >
                          <span className="material-symbols-outlined text-sm">
                            download
                          </span>{' '}
                          Unduh PDF Surat Izin
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {surat.status === 'Ditolak' && (
                  <div className="bg-rose-50 border border-rose-100 p-4 rounded text-left text-xs font-medium">
                    <strong className="text-rose-950 font-bold block mb-1">
                      Alasan Penolakan:
                    </strong>
                    <p className="text-gray-700 italic">{surat.catatan}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Approve Form Panel */}
            {action === 'approve' && (
              <div className="bg-white border border-emerald-200 rounded-lg p-5 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-emerald-800 font-mono tracking-wider uppercase">
                  SETUJUI & GENERATE SURAT
                </h4>
                <form onSubmit={handleApproveSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Catatan Tambahan (Opsional)
                    </label>
                    <textarea
                      value={formApprove.data.catatan}
                      onChange={(e) =>
                        formApprove.setData('catatan', e.target.value)
                      }
                      rows={3}
                      className="w-full bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                    />
                    {formApprove.errors.catatan && (
                      <span className="text-red-500 text-[10px] mt-1 block">
                        {formApprove.errors.catatan}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={formApprove.processing}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded font-bold font-mono text-[11px] tracking-wider transition-colors shadow-sm cursor-pointer"
                    >
                      SETUJUI & GENERATE
                    </button>
                    <button
                      type="button"
                      onClick={() => setAction('none')}
                      className="px-3 border border-gray-300 rounded text-gray-600 font-bold font-mono text-[11px] hover:bg-gray-50 cursor-pointer"
                    >
                      BATAL
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reject Form Panel */}
            {action === 'reject' && (
              <div className="bg-white border border-rose-200 rounded-lg p-5 shadow-sm space-y-4">
                <h4 className="font-bold text-xs text-rose-800 font-mono tracking-wider uppercase">
                  ALASAN PENOLAKAN
                </h4>
                <form onSubmit={handleRejectSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Tulis Alasan Penolakan
                    </label>
                    <textarea
                      value={formReject.data.catatan}
                      onChange={(e) =>
                        formReject.setData('catatan', e.target.value)
                      }
                      required
                      rows={4}
                      className="w-full bg-white border border-gray-300 rounded p-2 text-xs focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                    />
                    {formReject.errors.catatan && (
                      <span className="text-red-500 text-[10px] mt-1 block">
                        {formReject.errors.catatan}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={formReject.processing}
                      className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded font-bold font-mono text-[11px] tracking-wider transition-colors shadow-sm cursor-pointer"
                    >
                      TOLAK
                    </button>
                    <button
                      type="button"
                      onClick={() => setAction('none')}
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
