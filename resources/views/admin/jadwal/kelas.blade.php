@extends('layouts.admin')

@section('title', 'Data Kelas & Angkatan')
@section('header_title', 'Manajemen Jadwal')
@section('header_subtitle', 'Atur jadwal, mata kuliah, kelas, dan angkatan praktikum.')

@section('content')
<section class="p-8">

    <div class="mb-8 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a href="{{ route('jadwal.index') }}" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
                Jadwal Utama
            </a>
            <a href="{{ route('jadwal.matkul') }}" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
                Data Mata Kuliah
            </a>
            <a href="{{ route('jadwal.kelas') }}" class="border-[#203971] text-[#203971] whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm">
                Data Kelas & Angkatan
            </a>
        </nav>
    </div>

    @if(session('success'))
        <div class="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center gap-2">
            <span class="material-symbols-outlined">check_circle</span>
            {{ session('success') }}
        </div>
    @endif

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-1">
            <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 class="text-lg font-bold text-[#203971] mb-4 border-b border-gray-100 pb-2">Tambah Kelas Baru</h3>
                <form action="{{ route('jadwal.kelas.store') }}" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Nama Kelas</label>
                        <input type="text" name="kelas" required placeholder="Contoh: A" class="w-full bg-gray-50 border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-[#203971] outline-none uppercase">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Tahun Angkatan</label>
                        <input type="number" name="angkatan" required min="2020" max="2030" placeholder="Contoh: 2026" class="w-full bg-gray-50 border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-[#203971] outline-none">
                    </div>
                    <button type="submit" class="w-full bg-[#203971] hover:bg-[#152a55] text-white py-2.5 rounded font-bold transition-colors">Simpan Kelas</button>
                </form>
            </div>
        </div>

        <div class="md:col-span-2">
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table class="w-full text-left text-sm border-collapse">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="p-4 font-bold text-gray-600">Nama Kelas</th>
                            <th class="p-4 font-bold text-gray-600 text-center">Angkatan</th>
                            <th class="p-4 font-bold text-gray-600 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        @foreach($kelases as $kls)
                        <tr class="hover:bg-gray-50">
                            <td class="p-4 font-bold text-[#203971]">Kelas {{ $kls->kelas }}</td>
                            <td class="p-4 text-center font-mono">{{ $kls->angkatan }}</td>
                            <td class="p-4 text-center">
                                <form action="{{ route('jadwal.kelas.destroy', $kls->id) }}" method="POST" onsubmit="return confirm('Hapus Kelas ini? Jadwal yang terkait dengan kelas ini juga akan ikut terhapus.');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-500 hover:text-red-700 p-2"><span class="material-symbols-outlined text-sm">delete</span></button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</section>
@endsection