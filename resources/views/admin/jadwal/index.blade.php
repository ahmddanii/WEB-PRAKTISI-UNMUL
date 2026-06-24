@extends('layouts.admin')

@section('title', 'Manajemen Jadwal Praktikum')
@section('header_title', 'Manajemen Jadwal')
@section('header_subtitle', 'Atur jadwal, mata kuliah, kelas, dan angkatan praktikum.')

@section('content')
<section class="p-4 md:p-8">

    <div class="mb-6 md:mb-8 border-b border-gray-200 overflow-x-auto custom-scrollbar">
        <nav class="-mb-px flex space-x-6 md:space-x-8 min-w-max" aria-label="Tabs">
            <a href="{{ route('jadwal.index') }}" class="border-[#203971] text-[#203971] py-4 px-1 border-b-2 font-bold text-sm">
                Jadwal Utama
            </a>
            <a href="{{ route('jadwal.matkul') }}" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm transition-colors">
                Data Mata Kuliah
            </a>
            <a href="{{ route('jadwal.kelas') }}" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 border-b-2 font-medium text-sm transition-colors">
                Data Angkatan & Kelas
            </a>
        </nav>
    </div>

    <form action="{{ route('jadwal.index') }}" method="GET" class="bg-white p-4 md:p-6 rounded-xl border border-gray-200 mb-6 md:mb-8 shadow-sm">
        <div class="w-full md:max-w-sm">
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pilih Ruangan Lab</label>
            <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">meeting_room</span>
                <select name="ruangan_id" onchange="this.form.submit()" class="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm md:text-base text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none appearance-none transition-all">
                    @foreach($ruangans as $ruangan)
                        <option value="{{ $ruangan->id }}" {{ $ruanganAktif->id == $ruangan->id ? 'selected' : '' }}>
                            {{ $ruangan->kode_ruangan }} - {{ $ruangan->nama_ruangan }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>
    </form>

    @if(session('success'))
        <div class="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center gap-2 text-sm md:text-base">
            <span class="material-symbols-outlined">check_circle</span>
            {{ session('success') }}
        </div>
    @endif

    <form action="{{ route('jadwal.simpan') }}" method="POST">
        @csrf
        <input type="hidden" name="ruangan_id" value="{{ $ruanganAktif->id }}">

        <div class="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 w-full">
            <div class="overflow-x-auto custom-scrollbar rounded-xl">
                <table class="w-full border-collapse text-left text-sm min-w-[800px]">
                    <thead>
                        <tr class="bg-[#203971] text-white">
                            <th class="p-3 md:p-4 border-b border-[#152a55] border-r border-[#152a55]/50 font-bold w-24 md:w-32 text-center uppercase tracking-wider">Hari</th>
                            <th class="p-3 md:p-4 border-b border-[#152a55] border-r border-[#152a55]/50 font-bold w-32 md:w-48 text-center uppercase tracking-wider">Jam</th>
                            <th class="p-3 md:p-4 border-b border-[#152a55] border-r border-[#152a55]/50 font-bold w-[35%] uppercase tracking-wider">Kelas & Angkatan</th>
                            <th class="p-3 md:p-4 border-b border-[#152a55] font-bold uppercase tracking-wider">Mata Kuliah</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        
                        @foreach($hariJadwal as $hari => $jamList)
                            @php $slotCount = count($jamList); @endphp
                            
                            @foreach($jamList as $index => $jam)
                                
                                @if($hari == 'JUMAT' && $index == 3)
                                    <tr class="bg-emerald-500 text-white font-bold">
                                        <td class="p-3 text-center tracking-widest text-[10px] md:text-xs" colspan="3">
                                            <div class="flex items-center justify-center gap-2">
                                                <span class="material-symbols-outlined text-sm">mosque</span> JEDA SHALAT JUM'AT (11:30 - 13:30)
                                            </div>
                                        </td>
                                    </tr>
                                @endif

                                <tr class="hover:bg-gray-50 transition-colors">
                                    @if($index == 0)
                                        <td class="p-3 md:p-4 font-extrabold text-[#203971] align-middle text-center bg-gray-50/50 border-r border-gray-200" rowspan="{{ $hari == 'JUMAT' ? $slotCount + 1 : $slotCount }}">
                                            {{ $hari }}
                                        </td>
                                    @endif

                                    <td class="p-3 md:p-4 font-mono text-gray-700 text-center font-bold border-r border-gray-200 bg-gray-50/30 text-xs md:text-sm whitespace-nowrap">
                                        {{ $jam }}
                                    </td>
                                    
                                    <td class="p-2 md:p-3 border-r border-gray-200">
                                        <select name="jadwal[{{ $hari }}][{{ $jam }}][kelas_id]" class="w-full min-w-[140px] md:min-w-0 bg-transparent border border-gray-300 rounded p-2 md:p-2.5 focus:ring-2 focus:ring-[#203971] text-xs md:text-sm outline-none transition-shadow">
                                            <option value="">-- Kosong --</option>
                                            @foreach($kelases as $kelas)
                                                <option value="{{ $kelas->id }}" {{ (isset($jadwalMapped[$hari][$jam]) && $jadwalMapped[$hari][$jam]->kelas_id == $kelas->id) ? 'selected' : '' }}>
                                                    Kelas {{ $kelas->kelas }} {{ $kelas->angkatan }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </td>
                                    
                                    <td class="p-2 md:p-3">
                                        <select name="jadwal[{{ $hari }}][{{ $jam }}][mata_kuliah_id]" class="w-full min-w-[180px] md:min-w-0 bg-transparent border border-gray-300 rounded p-2 md:p-2.5 focus:ring-2 focus:ring-[#203971] text-xs md:text-sm outline-none transition-shadow">
                                            <option value="">-- Kosong --</option>
                                            @foreach($matkuls as $matkul)
                                                <option value="{{ $matkul->id }}" {{ (isset($jadwalMapped[$hari][$jam]) && $jadwalMapped[$hari][$jam]->mata_kuliah_id == $matkul->id) ? 'selected' : '' }}>
                                                    {{ $matkul->nama_mk }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </td>
                                </tr>
                            @endforeach
                        @endforeach

                    </tbody>
                </table>
            </div>
        </div>

        <div class="flex justify-end mt-2 md:mt-4">
            <button type="submit" class="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 md:py-3 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2 tracking-wider">
                <span class="material-symbols-outlined">save</span> SIMPAN JADWAL
            </button>
        </div>
    </form>

</section>
@endsection