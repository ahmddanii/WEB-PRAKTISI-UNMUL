export interface Berita {
    id: number;
    judul: string;
    slug: string;
    isi: string;
    thumbnail?: string;
    kategori?: string;
    author?: string;
    created_at: string;
    updated_at?: string;
}

export interface Pengurus {
    id: number;
    nama: string;
    jabatan: string;
    foto?: string;
    angkatan?: string;
}

export interface Jadwal {
    id: number;
    matkul: string;
    kelas: string;
    hari: string;
    jam: string;
    ruang: string;
    asisten?: string;
}

export interface Pengaduan {
    id: number;
    ticket_number: string;
    kategori: 'pengaduan' | 'aspirasi';
    nama: string;
    nim: string;
    angkatan: string;
    matkul: string;
    judul: string;
    isi: string;
    file_lampiran?: string;
    status: 'pending' | 'diproses' | 'selesai' | 'ditolak';
    tanggapan?: string;
    created_at: string;
    updated_at?: string;
}

export interface PengajuanSurat {
    id: number;
    ticket_number: string;
    nama: string;
    nim: string;
    angkatan: string;
    matkul: string;
    kelas: string;
    jadwal_id?: number;
    keperluan: string;
    request_pindah_sesi: boolean;
    sesi_tujuan?: string;
    file_bukti?: string;
    status: 'pending' | 'disetujui' | 'ditolak';
    catatan?: string;
    file_surat?: string;
    created_at: string;
    updated_at?: string;
}
