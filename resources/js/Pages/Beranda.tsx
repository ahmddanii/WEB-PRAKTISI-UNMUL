import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";

interface Berita {
    id: number;
    judul: string;
    slug: string;
    isi: string;
    thumbnail?: string;
    kategori?: string;
    created_at: string;
}

interface BerandaProps {
    beritaTerbaru: Berita[];
}

export default function Beranda({ beritaTerbaru }: BerandaProps) {
    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        } catch (e) {
            return dateStr;
        }
    };

    const truncateText = (htmlStr: string, limit: number = 120) => {
        const text = htmlStr.replace(/<[^>]*>/g, "");
        if (text.length > limit) {
            return text.slice(0, limit) + "...";
        }
        return text;
    };

    return (
        <AppLayout>
            <Head title="Beranda" />

            {/* Hero Section */}
            <section className="relative py-16 md:py-40 flex items-center justify-center overflow-hidden hero-gradient px-8">
                <div className="max-w-[1280px] w-full flex flex-col text-center items-center">
                    <div className="space-y-6 z-10 flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-outline-variant shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#bc000a]"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                                Tahun Akademik 2025/2026
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-[#455d97] max-w-3xl leading-tight">
                            Selamat datang di Web Praktikum Sistem Informasi
                        </h1>

                        <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                            Tempat mengakses berbagai informasi dan layanan
                            terkait praktikum sistem informasi dengan mudah dan
                            cepat.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center pt-4">
                            <a
                                href="#layanan"
                                className="bg-[#455d97] text-white px-6 py-3 font-bold hover:shadow-lg transition-all rounded flex items-center gap-2"
                            >
                                Lihat Layanan{" "}
                                <span className="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </a>
                            <Link
                                href="/dokumen"
                                className="border-2 border-[#455d97] text-[#455d97] px-6 py-3 font-bold hover:bg-[#455d97] hover:text-white transition-all rounded"
                            >
                                Panduan Praktikan
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Layanan Section */}
            <section id="layanan" className="py-16 px-8 max-w-[1280px] mx-auto">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl text-[#455d97] mb-3 font-bold">
                        Layanan yang Tersedia
                    </h2>
                    <p className="text-gray-600 max-w-2xl">
                        Kami menyediakan berbagai layanan untuk mendukung proses
                        belajar Kamu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg border border-gray-200">
                        <span className="material-symbols-outlined text-4xl text-[#ba1a1a] mb-4">
                            calendar_month
                        </span>
                        <h4 className="text-lg text-[#455d97] font-bold mb-2">
                            Jadwal Praktikum
                        </h4>
                        <p className="text-sm text-gray-600 mb-6 flex-grow">
                            Jadwal praktikum yang terupdate dan mudah diakses.
                        </p>
                        <Link
                            href="/jadwal"
                            className="bg-[#203971] text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all w-full text-center"
                        >
                            Lihat
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg border border-gray-200">
                        <span className="material-symbols-outlined text-4xl text-[#ba1a1a] mb-4">
                            gavel
                        </span>
                        <h4 className="text-lg text-[#455d97] font-bold mb-2">
                            Peraturan Praktikum
                        </h4>
                        <p className="text-sm text-gray-600 mb-6 flex-grow">
                            Aturan dan tata tertib selama praktikum berlangsung.
                        </p>
                        <Link
                            href="/dokumen"
                            className="bg-[#203971] text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all w-full text-center"
                        >
                            Lihat
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg border border-gray-200">
                        <span className="material-symbols-outlined text-4xl text-[#ba1a1a] mb-4">
                            newspaper
                        </span>
                        <h4 className="text-lg text-[#455d97] font-bold mb-2">
                            Berita & Pengumuman
                        </h4>
                        <p className="text-sm text-gray-600 mb-6 flex-grow">
                            Informasi terbaru seputar kegiatan dan asisten
                            laboratorium.
                        </p>
                        <Link
                            href="/berita"
                            className="bg-[#203971] text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all w-full text-center"
                        >
                            Lihat
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg border border-gray-200">
                        <span className="material-symbols-outlined text-4xl text-[#ba1a1a] mb-4">
                            mail
                        </span>
                        <h4 className="text-lg text-[#455d97] font-bold mb-2">
                            Kontak Kami
                        </h4>
                        <p className="text-sm text-gray-600 mb-6 flex-grow">
                            Hubungi kami untuk bantuan dan informasi lebih
                            lanjut.
                        </p>
                        <Link
                            href="/kontak"
                            className="bg-[#203971] text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all w-full text-center"
                        >
                            Lihat
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg border border-gray-200">
                        <span className="material-symbols-outlined text-4xl text-[#ba1a1a] mb-4">
                            description
                        </span>
                        <h4 className="text-lg text-[#455d97] font-bold mb-2">
                            Pengajuan Surat
                        </h4>
                        <p className="text-sm text-gray-600 mb-6 flex-grow">
                            Ajukan surat keterangan dan dokumen resmi praktikum
                            secara online.
                        </p>
                        <Link
                            href="/pengajuan-surat"
                            className="bg-[#203971] text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all w-full text-center"
                        >
                            Lihat
                        </Link>
                    </div>
                </div>
            </section>

            {/* Berita Section */}
            <section className="py-16 bg-[#f9f9f9]">
                <div className="max-w-[1280px] mx-auto px-8">
                    <div className="flex justify-between items-end mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#455d97]">
                            Berita & Pengumuman
                        </h3>
                        <Link
                            className="hidden md:block font-bold text-[#455d97] border-b-2 border-[#455d97] pb-1 hover:text-[#bc000a] transition-colors"
                            href="/berita"
                        >
                            Lihat Semua Berita
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {beritaTerbaru.length > 0 ? (
                            beritaTerbaru.map((item) => (
                                <article
                                    key={item.id}
                                    className="group bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                                >
                                    <Link
                                        href={`/berita/${item.slug}`}
                                        className="aspect-[16/9] mb-5 overflow-hidden rounded bg-gray-100 flex-shrink-0 block"
                                    >
                                        {item.thumbnail ? (
                                            <img
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                src={`/storage/${item.thumbnail}`}
                                                alt={item.judul}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                                                <span className="material-symbols-outlined text-4xl">
                                                    image
                                                </span>
                                            </div>
                                        )}
                                    </Link>

                                    <div className="space-y-2 flex flex-col flex-grow">
                                        <span className="text-[10px] text-[#bc000a] font-bold uppercase tracking-wider">
                                            {item.kategori || "Umum"} •{" "}
                                            {formatDate(item.created_at)}
                                        </span>

                                        <Link
                                            href={`/berita/${item.slug}`}
                                            className="block"
                                        >
                                            <h4 className="text-lg font-bold text-[#455d97] group-hover:text-[#bc000a] transition-colors leading-tight line-clamp-2">
                                                {item.judul}
                                            </h4>
                                        </Link>

                                        <p className="text-sm text-gray-600 line-clamp-3 mt-2 flex-grow">
                                            {truncateText(item.isi)}
                                        </p>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-3 text-center py-10">
                                <p className="text-gray-500">
                                    Belum ada berita atau pengumuman saat ini.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
