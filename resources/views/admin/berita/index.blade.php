@extends('layouts.admin')

@section('title', 'Manajemen Berita')
@section('header_title', 'Manajemen Berita')
@section('header_subtitle', 'Kelola publikasi berita, informasi, dan pengumuman praktikum.')

@section('content')
<!-- Stats Overview -->
<section class="p-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="academic-card p-6 rounded-xl flex flex-col justify-center border border-gray-200 md:col-span-1 shadow-sm">
            <span class="font-mono text-[12px] text-gray-500 uppercase tracking-wider">Total Berita</span>
            <div class="flex items-baseline gap-2 mt-2">
                <span class="text-4xl font-bold text-[#203971]">{{ $totalBerita ?? 0 }}</span>
                <span class="text-gray-600 text-sm font-medium">Artikel dipublikasi</span>
            </div>
        </div>
    </div>
</section>

<!-- News Table List -->
<section class="px-8 pb-12">
    <div class="academic-card rounded-xl overflow-hidden border border-gray-200 bg-white">
        
        <!-- Table Header & Actions -->
        <div class="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50/50 gap-4">
            <h4 class="text-xl font-bold text-[#203971]">Daftar Artikel</h4>
            <div class="flex gap-2">
                <!-- Nanti href ini diisi dengan route untuk form tambah berita -->
                <a href="/admin/berita/create" class="bg-[#203971] text-white px-4 py-2 text-sm font-bold rounded flex items-center gap-2 hover:bg-[#152a55] transition-all">
                    <span class="material-symbols-outlined text-sm">add</span> Buat Berita
                </a>
                <button class="p-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-gray-600">
                    <span class="material-symbols-outlined">filter_list</span>
                </button>
            </div>
        </div>

        <!-- Table Data -->
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="font-mono text-[12px] text-gray-500 border-b border-gray-200 bg-gray-50 uppercase tracking-wider">
                        <th class="px-6 py-4 font-semibold">Judul Artikel</th>
                        <th class="px-6 py-4 font-semibold">Penulis</th>
                        <th class="px-6 py-4 font-semibold">Kategori</th>
                        <th class="px-6 py-4 font-semibold">Tanggal</th>
                        <th class="px-6 py-4 font-semibold text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse ($berita as $item)
                    <tr class="group hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded bg-gray-100 border border-gray-200 flex-shrink-0 overflow-hidden">
                                    @if($item->thumbnail)
                                        <img src="{{ asset('storage/' . $item->thumbnail) }}" class="w-full h-full object-cover">
                                    @else
                                        <img src="https://via.placeholder.com/150" class="w-full h-full object-cover">
                                    @endif
                                </div>
                                <div>
                                    <div class="text-base font-bold text-[#203971]">{{ $item->judul }}</div>
                                    <div class="text-sm text-gray-500 w-48 truncate">{{ strip_tags($item->isi) }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-gray-700 text-sm">{{ $item->author }}</td>
                        <td class="px-6 py-4">
                            <span class="px-3 py-1 bg-blue-50 border border-blue-200 text-[#203971] rounded-full text-xs font-mono uppercase font-semibold">
                                {{ $item->kategori ?? 'Umum' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-gray-600 font-mono text-sm">
                            {{ $item->created_at->format('d M Y') }}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex gap-2 justify-center">
                                <a href="/admin/berita/{{ $item->id }}/edit" class="p-2 text-gray-400 hover:text-[#203971] transition-colors bg-white border border-gray-200 rounded shadow-sm hover:shadow" title="Edit">
                                    <span class="material-symbols-outlined text-sm">edit</span>
                                </a>
                                <form action="/admin/berita/{{ $item->id }}" method="POST" class="inline" onsubmit="return confirm('Yakin ingin menghapus berita ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="p-2 text-gray-400 hover:text-[#F32923] transition-colors bg-white border border-gray-200 rounded shadow-sm hover:shadow" title="Hapus">
                                        <span class="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                            Belum ada berita yang diterbitkan.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Table Pagination Info -->
        <div class="p-6 bg-gray-50 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 gap-4">
            <span class="text-gray-500 font-mono text-[12px] uppercase tracking-wider">Menampilkan 1-10 dari 12 Artikel</span>
            <div class="flex gap-2">
                <button class="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors text-sm font-bold text-gray-600">SEBELUMNYA</button>
                <button class="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-100 transition-colors text-sm font-bold text-gray-600">SELANJUTNYA</button>
            </div>
        </div>

    </div>
</section>
@endsection