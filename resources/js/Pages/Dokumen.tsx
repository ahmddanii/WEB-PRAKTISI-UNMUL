import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function Dokumen() {
  return (
    <AppLayout>
      <Head title="Dokumen & Peraturan Praktikum" />

      <section className="py-14 px-6 md:px-8 max-w-[1280px] mx-auto min-h-[80vh]">
        {/* Header Halaman (Rata Kiri) */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#455d97] tracking-tight">Dokumen & Peraturan</h1>
          <p className="text-gray-500 text-lg mt-2">
            Silakan baca dan pahami kontrak, aturan, serta sanksi yang berlaku selama kegiatan Praktikum Sistem Informasi berlangsung.
          </p>
        </div>
        
        <div className="h-[1px] w-full bg-gray-200 mb-10"></div>

        {/* WADAH PERATURAN (Dibuat Center dengan mx-auto) */}
        <div className="w-full flex justify-center">
          {/* Div khusus yang membatasi lebar agar rapi dan berada di tengah */}
          <div className="space-y-4 w-full max-w-4xl"> 

            {/* 1. Kontrak Praktikum */}
            <details className="group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-[#455d97] hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#bc000a]">history_edu</span>
                  <span className="text-lg">Kontrak Praktikum</span>
                </div>
                <span className="transition-transform duration-300 group-open:rotate-180 text-gray-400 group-hover:text-[#455d97]">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <ul className="list-none space-y-3 text-gray-700 text-sm md:text-base">
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Praktikan wajib menandatangani Kontrak Praktikum.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Kehadiran wajib 100%.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Toleransi keterlambatan maksimal 15 menit.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Praktikan wajib menghubungi Aslab yang diajar, jika tidak dapat hadir untuk pindah sesi di minggu yang sama.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Pindah sesi tanpa alasan yang valid dan tanpa mendapat izin praktisi, dianggap tidak mengikuti praktikum.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Praktisi hanya dapat dihubungi pada jam kerja (Senin - Sabtu | 07.00 - 17.00).</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Tugas praktikum wajib diselesaikan untuk lanjut ke tahap berikutnya. Mahasiswa yang tidak menyelesaikannya tidak dapat mengikuti praktikum selanjutnya, kecuali dengan alasan valid dan izin asisten laboratorium.</li>
                </ul>
              </div>
            </details>

            {/* 2. Sanksi Kontrak Praktikum */}
            <details className="group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-[#455d97] hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#bc000a]">warning</span>
                  <span className="text-lg">Sanksi Kontrak Praktikum</span>
                </div>
                <span className="transition-transform duration-300 group-open:rotate-180 text-gray-400 group-hover:text-[#455d97]">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <ul className="list-none space-y-3 text-gray-700 text-sm md:text-base">
                  <li className="flex gap-3"><span className="text-[#bc000a] font-bold">x</span> Tidak dapat mengikuti praktikum jika belum menandatangani kontrak praktikum.</li>
                  <li className="flex gap-3"><span className="text-[#bc000a] font-bold">x</span> Tidak dapat mengikuti Project Akhir jika kehadiran tidak 100%.</li>
                  <li className="flex gap-3"><span className="text-[#bc000a] font-bold">x</span> Tidak dapat memasuki kelas jika telat lewat 15 menit tanpa alasan yang diterima praktisi pengajar.</li>
                  <li className="flex gap-3"><span className="text-[#bc000a] font-bold">x</span> Praktikan tidak dapat mengikuti pertemuan selanjutnya jika tidak mengerjakan Posttest atau Minpro di pertemuan sebelumnya.</li>
                  <li className="flex gap-3"><span className="text-[#bc000a] font-bold">x</span> Tidak ada toleransi keterlambatan mengumpulkan Posttest / Minpro.</li>
                </ul>
              </div>
            </details>

            {/* 3. Aturan Laboratorium */}
            <details className="group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-[#455d97] hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#bc000a]">meeting_room</span>
                  <span className="text-lg">Aturan Laboratorium</span>
                </div>
                <span className="transition-transform duration-300 group-open:rotate-180 text-gray-400 group-hover:text-[#455d97]">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <ul className="list-none space-y-3 text-gray-700 text-sm md:text-base">
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Berpakaian rapi.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Sepatu wajib dirapikan pada rak atau lemari.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Mematikan PC Lab setelah selesai digunakan.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Dilarang membawa pulang peralatan Laboratorium.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Menjaga ketenangan, keamanan, dan ketertiban selama praktikum berlangsung.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Dilarang minum, makan, dan meninggalkan sampah.</li>
                  <li className="flex gap-3"><span className="text-[#455d97] font-bold">•</span> Dilarang menginstal atau menambahkan aplikasi selain yang dibutuhkan pada komputer laboratorium.</li>
                </ul>
              </div>
            </details>

            {/* 4. Surat Peringatan */}
            <details className="group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-[#455d97] hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#bc000a]">mail</span>
                  <span className="text-lg">Surat Peringatan</span>
                </div>
                <span className="transition-transform duration-300 group-open:rotate-180 text-gray-400 group-hover:text-[#455d97]">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <ul className="list-none space-y-3 text-gray-700 text-sm md:text-base">
                  <li className="flex gap-3"><span className="text-[#bc000a] font-bold">!</span> Surat peringatan akan dikeluarkan jikalau melanggar aturan lab dan kontrak praktikum.</li>
                  <li className="flex gap-3"><span className="text-[#bc000a] font-bold">!</span> Praktikan tidak diperbolehkan untuk mengikuti praktikum apabila sudah menerima SP kedua.</li>
                </ul>
              </div>
            </details>

          </div>
        </div>
      </section>
    </AppLayout>
  );
}
