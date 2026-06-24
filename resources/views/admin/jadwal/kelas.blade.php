@extends('layouts.admin')

@section('title', 'Data Kelas & Angkatan')
@section('header_title', 'Manajemen Jadwal')
@section('header_subtitle', 'Atur jadwal, mata kuliah, kelas, dan angkatan praktikum.')

@section('content')
<section class="p-4 md:p-8">

    <div class="mb-6 md:mb-8 border-b border-gray-200 overflow-x-auto custom-scrollbar">
        <nav class="-mb-px flex space-x-6 md:space-x-8 min-w-max" aria-label="Tabs">
            <a href="{{ route('jadwal.index') }}" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm transition-colors">
                Jadwal Utama
            </a>
            <a href="{{ route('jadwal.matkul') }}" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm transition-colors">
                Data Mata Kuliah
            </a>
            <a href="{{ route('jadwal.kelas') }}" class="border-[#203971] text-[#203971] py-4 px-1 border-b-2 font-bold text-sm">
                Data Kelas & Angkatan
            </a>
        </nav>
    </div>

    @if(session('success'))
        <div class="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center gap-2 text-sm md:text-base">
            <span class="material-symbols-outlined">check_circle</span>
            {{ session('success') }}
        </div>
    @endif

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        <div class="md:col-span-1 order-1 md:order-1">
            <div class="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 class="text-lg font-bold text-[#203971] mb-4 border-b border-gray-100 pb-2">Tambah Kelas Baru</h3>
                <form action="{{ route('jadwal.kelas.store') }}" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Nama Kelas</label>
                        <input type="text" name="kelas" required placeholder="Contoh: A" class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#203971] outline-none uppercase transition-all">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Tahun Angkatan</label>
                        <input type="number" name="angkatan" required min="2020" max="2030" placeholder="Contoh: 2026" class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#203971] outline-none transition-all">
                    </div>
                    <button type="submit" class="w-full bg-[#203971] hover:bg-[#152a55] text-white py-2.5 rounded-lg font-bold transition-colors shadow-sm">Simpan Kelas</button>
                </form>
            </div>
        </div>

        <div class="md:col-span-2 order-2 md:order-2">
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm w-full overflow-hidden">
                <div class="overflow-x-auto custom-scrollbar">
                    <table class="w-full text-left text-sm border-collapse min-w-[400px]">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="p-4 font-bold text-gray-600 whitespace-nowrap">Nama Kelas</th>
                                <th class="p-4 font-bold text-gray-600 text-center whitespace-nowrap">Angkatan</th>
                                <th class="p-4 font-bold text-gray-600 text-center whitespace-nowrap">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            @forelse($kelases as $kls)
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="p-4 font-bold text-[#203971]">Kelas {{ $kls->kelas }}</td>
                                <td class="p-4 text-center font-mono text-gray-700">{{ $kls->angkatan }}</td>
                                <td class="p-4 text-center">
                                    <form action="{{ route('jadwal.kelas.destroy', $kls->id) }}" method="POST" onsubmit="return confirm('Hapus Kelas ini? Jadwal yang terkait dengan kelas ini juga akan ikut terhapus.');" class="inline-block">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-gray-400 hover:text-red-600 transition-colors p-2 bg-white border border-gray-200 rounded shadow-sm hover:shadow" title="Hapus Kelas">
                                            <span class="material-symbols-outlined text-sm block">delete</span>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="3" class="p-8 text-center text-gray-500">
                                    Belum ada data kelas yang ditambahkan.
                                </td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    </div>

</section>
@endsection