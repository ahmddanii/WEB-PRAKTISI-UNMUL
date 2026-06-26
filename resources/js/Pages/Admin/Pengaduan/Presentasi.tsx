import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';

interface PengaduanItem {
    id: number;
    nomor_tiket: string;
    kategori: 'pengaduan' | 'aspirasi';
    kategori_label: string;
    angkatan: number;
    mata_kuliah?: {
        id: number;
        nama_mk: string;
    };
    pelapor: string;
    isi_pengaduan: string;
    file_lampiran?: string;
    status: 'baru' | 'sudah_dibahas';
    created_at: string;
}

interface PresentasiProps {
    filters: any;
}

export default function Presentasi({ filters }: PresentasiProps) {
    const [items, setItems] = useState<PengaduanItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Enter fullscreen automatically on load
    useEffect(() => {
        const enterFullscreen = async () => {
            try {
                if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                }
            } catch (err) {
                console.error("Error entering fullscreen:", err);
            }
        };
        enterFullscreen();

        // Redirect back when user exits fullscreen natively (e.g. Esc key)
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                handleExit();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Fetch data based on filters
    useEffect(() => {
        const queryParams = new URLSearchParams(filters).toString();
        fetch(`/admin/pengaduan/presentasi/data?${queryParams}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading presentation data:", err);
                setLoading(false);
            });
    }, [filters]);

    const activeItem = items[currentIndex];

    // Navigation and Action Handlers
    const handleNext = () => {
        if (currentIndex < items.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleTandaiDibahas = async () => {
        if (!activeItem || activeItem.status === 'sudah_dibahas' || isProcessing) return;

        setIsProcessing(true);
        try {
            const res = await fetch(`/admin/pengaduan/${activeItem.id}/tandai-dibahas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                }
            });

            if (res.ok) {
                // Update local status
                const updatedItems = [...items];
                updatedItems[currentIndex].status = 'sudah_dibahas';
                setItems(updatedItems);
                
                // Auto advance to next if available
                setTimeout(() => {
                    handleNext();
                }, 400);
            }
        } catch (err) {
            console.error("Error marking as discussed:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleExit = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
        router.visit('/admin/pengaduan');
    };

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (loading || items.length === 0) return;

            switch (e.key) {
                case 'ArrowRight':
                case ' ': // Spacebar
                    e.preventDefault();
                    handleNext();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    handlePrev();
                    break;
                case 'd':
                case 'D':
                    e.preventDefault();
                    handleTandaiDibahas();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [loading, items, currentIndex, isProcessing]);

    const getKategoriColor = (kategori: string) => {
        switch (kategori) {
            case 'pengaduan':
                return 'bg-red-500/20 text-red-400 border border-red-500/30';
            case 'aspirasi':
                return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
            default:
                return 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
        }
    };

    return (
        <>
            <Head title="Mode Presentasi Evaluasi Pengaduan" />
            <div className="min-h-screen bg-[#0b1329] text-slate-100 flex flex-col font-sans select-none select-none relative overflow-hidden">
                
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

                {/* Top Header */}
                <header className="p-6 border-b border-slate-800 flex items-center justify-between z-10 bg-[#0f1b3a]">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#3b82f6] text-3xl">co_present</span>
                        <div>
                            <h1 className="text-lg font-black font-mono tracking-wider">RAPAT EVALUASI ASPIRASI MAHASISWA</h1>
                            <p className="text-xs text-slate-400 font-mono">Web PRAKTISI — Universitas Mulawarman</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleExit}
                        className="inline-flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 px-4 py-2 rounded-lg text-xs font-bold font-mono tracking-wider transition-all cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-sm">close</span> KELUAR [ESC]
                    </button>
                </header>

                {/* Main Content Card Wrapper */}
                <main className="flex-1 flex flex-col justify-center items-center p-8 z-10">
                    {loading ? (
                        <div className="text-center space-y-3 font-mono">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3b82f6] mx-auto" />
                            <p className="text-xs text-slate-400">MEMUAT REKAP ASPIRASI...</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center p-12 bg-[#0f1b3a] border border-slate-800 rounded-2xl max-w-lg w-full space-y-4 shadow-xl">
                            <span className="material-symbols-outlined text-slate-500 text-5xl">folder_off</span>
                            <h2 className="text-lg font-bold text-slate-300">Tidak Ada Pengaduan</h2>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                                Tidak ditemukan data aspirasi yang belum dibahas sesuai dengan kriteria filter yang diterapkan.
                            </p>
                            <button
                                onClick={handleExit}
                                className="bg-[#203971] hover:bg-[#152a55] text-white px-5 py-2 rounded font-mono text-xs font-bold cursor-pointer"
                            >
                                KEMBALI
                            </button>
                        </div>
                    ) : (
                        <div className="max-w-5xl w-full flex flex-col items-center gap-6">
                            
                            {/* Slide Counter Indicator */}
                            <div className="text-sm font-mono font-bold text-slate-400 bg-slate-800/40 px-4 py-1.5 rounded-full border border-slate-700/50">
                                {currentIndex + 1} / {items.length} Pengaduan
                            </div>

                            {/* Presentation Card */}
                            <div className="bg-[#0f1b3a] border-2 border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl w-full relative transition-all duration-300">
                                
                                {/* Status overlay badge */}
                                {activeItem.status === 'sudah_dibahas' && (
                                    <div className="absolute top-4 right-4 bg-emerald-500/25 border border-emerald-500/50 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black font-mono tracking-widest uppercase">
                                        SUDAH DIBAHAS
                                    </div>
                                )}

                                {/* Meta Header */}
                                <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-semibold text-slate-400 mb-8 border-b border-slate-800 pb-5">
                                    <span className="text-[#3b82f6] font-bold text-sm bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20">
                                        {activeItem.nomor_tiket}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${getKategoriColor(activeItem.kategori)}`}>
                                        {activeItem.kategori_label}
                                    </span>
                                    <span>&bull;</span>
                                    <span className="text-slate-200">Angkatan {activeItem.angkatan}</span>
                                    <span>&bull;</span>
                                    <span className="text-slate-200 truncate">
                                        {activeItem.mata_kuliah ? activeItem.mata_kuliah.nama_mk : 'Umum / Tidak spesifik'}
                                    </span>
                                </div>

                                {/* Main Complaint Content */}
                                <div className="min-h-[220px] flex items-center justify-center">
                                    <p className="text-xl md:text-2xl font-normal leading-relaxed text-slate-100 text-left whitespace-pre-wrap w-full font-serif italic text-slate-200 px-2 border-l-4 border-slate-700 pl-6">
                                        "{activeItem.isi_pengaduan}"
                                    </p>
                                </div>

                                {/* Footer info */}
                                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-slate-400">
                                    <div>
                                        Pelapor: <span className="font-bold text-slate-200">{activeItem.pelapor}</span>
                                    </div>
                                    <div>
                                        Masuk: <span className="text-slate-200">
                                            {new Date(activeItem.created_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    {activeItem.file_lampiran && (
                                        <div>
                                            Lampiran: <a
                                                href={`/admin/pengaduan/${activeItem.id}/lampiran`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#3b82f6] hover:underline font-bold inline-flex items-center gap-1"
                                            >
                                                <span className="material-symbols-outlined text-xs">open_in_new</span> Lihat Bukti
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Control Actions Panel */}
                            <div className="flex items-center gap-4 mt-2">
                                
                                <button
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                    className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 border border-slate-700 text-slate-200 p-3 rounded-full cursor-pointer transition-colors"
                                    title="Sebelumnya (Arrow Left)"
                                >
                                    <span className="material-symbols-outlined text-xl block">arrow_back</span>
                                </button>

                                <button
                                    onClick={handleTandaiDibahas}
                                    disabled={activeItem.status === 'sudah_dibahas' || isProcessing}
                                    className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-950 disabled:text-emerald-700 text-white font-mono font-bold tracking-widest text-xs px-8 py-3.5 rounded-full transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:cursor-not-allowed hover:-translate-y-0.5"
                                    title="Tandai Dibahas (Key D)"
                                >
                                    <span className="material-symbols-outlined text-sm">check</span> 
                                    {isProcessing ? 'MEMROSES...' : 'TANDAI DIBAHAS [D]'}
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={currentIndex === items.length - 1}
                                    className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 border border-slate-700 text-slate-200 p-3 rounded-full cursor-pointer transition-colors"
                                    title="Berikutnya (Arrow Right / Space)"
                                >
                                    <span className="material-symbols-outlined text-xl block">arrow_forward</span>
                                </button>

                            </div>

                            {/* Shortcut Help Legend */}
                            <div className="text-[10px] text-slate-500 font-mono flex gap-4 mt-2 justify-center border-t border-slate-800/50 pt-4 w-full">
                                <span>Shortcut:</span>
                                <span><kbd className="bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-400">Space</kbd> / <kbd className="bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-400">&rarr;</kbd> Next</span>
                                <span><kbd className="bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-400">&larr;</kbd> Prev</span>
                                <span><kbd className="bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-400">D</kbd> Mark Discussed</span>
                                <span><kbd className="bg-slate-800/80 px-1.5 py-0.5 rounded text-slate-400">Esc</kbd> Exit</span>
                            </div>

                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
