@extends('layouts.admin')

@section('title', 'Data Mata Kuliah')
@section('header_title', 'Manajemen Jadwal')
@section('header_subtitle', 'Atur jadwal, mata kuliah, kelas, dan angkatan praktikum.')

@section('content')
<section class="p-8">

    <div class="mb-8 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <a href="{{ route('jadwal.index') }}" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
                Jadwal Utama
            </a>
            <a href="{{ route('jadwal.matkul') }}" class="border-[#203971] text-[#203971] whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm">
                Data Mata Kuliah
            </a>
            <a href="{{ route('jadwal.kelas') }}" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
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
                <h3 class="text-lg font-bold text-[#203971] mb-4 border-b border-gray-100 pb-2">Tambah Mata Kuliah</h3>
                <form action="{{ route('jadwal.matkul.store') }}" method="POST" class="space-y-4">
                    @csrf
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Kode MK</label>
                        <input type="text" name="kode_mk" required placeholder="Contoh: PBW" class="w-full bg-gray-50 border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-[#203971] outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Nama Mata Kuliah</label>
                        <input type="text" name="nama_mk" required placeholder="Contoh: Pemrograman Berbasis Web" class="w-full bg-gray-50 border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-[#203971] outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Semester</label>
                        <input type="number" name="semester" required min="1" max="8" placeholder="Contoh: 4" class="w-full bg-gray-50 border border-gray-300 rounded p-2.5 focus:ring-2 focus:ring-[#203971] outline-none">
                    </div>
                    <button type="submit" class="w-full bg-[#203971] hover:bg-[#152a55] text-white py-2.5 rounded font-bold transition-colors">Simpan Mata Kuliah</button>
                </form>
            </div>
        </div>

        <div class="md:col-span-2">
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table class="w-full text-left text-sm border-collapse">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="p-4 font-bold text-gray-600">Kode</th>
                            <th class="p-4 font-bold text-gray-600">Nama Mata Kuliah</th>
                            <th class="p-4 font-bold text-gray-600 text-center">Semester</th>
                            <th class="p-4 font-bold text-gray-600 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        @foreach($matkuls as $mk)
                        <tr class="hover:bg-gray-50">
                            <td class="p-4 font-mono text-[#203971] font-bold">{{ $mk->kode_mk }}</td>
                            <td class="p-4 font-medium">{{ $mk->nama_mk }}</td>
                            <td class="p-4 text-center">{{ $mk->semester }}</td>
                            <td class="p-4 text-center">
                                <form action="{{ route('jadwal.matkul.destroy', $mk->id) }}" method="POST" onsubmit="return confirm('Hapus Mata Kuliah ini? Jadwal yang memakai MK ini juga akan terhapus.');">
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