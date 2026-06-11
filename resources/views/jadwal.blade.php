@extends('layouts.app')

@section('title', 'Jadwal Praktikum')

@section('content')
<section class="py-14 px-6 md:px-8 max-w-[1280px] mx-auto min-h-[80vh]">
    
    <div class="mb-10">
        <h1 class="text-4xl md:text-5xl font-bold text-[#455d97] tracking-tight">Jadwal Praktikum</h1>
        <p class="text-gray-500 text-lg">Lihat jadwal kegiatan praktikum sistem informasi berdasarkan ruangan.</p>
    </div>
    <div class="h-[1px] w-full bg-gray-200 mb-10"></div>

    <form action="{{ route('jadwal') }}" method="GET" class="bg-white p-6 rounded-xl border border-gray-200 mb-8 flex flex-wrap gap-4 items-end shadow-sm">
        <div class="flex-grow max-w-sm">
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pilih Ruangan Lab</label>
            <div class="relative">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">meeting_room</span>
                <select name="ruangan_id" onchange="this.form.submit()" class="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-[#455d97] focus:border-[#455d97] outline-none appearance-none transition-all cursor-pointer">
                    @foreach($ruangans as $ruangan)
                        <option value="{{ $ruangan->id }}" {{ $ruanganAktif->id == $ruangan->id ? 'selected' : '' }}>
                            {{ $ruangan->kode_ruangan }} - {{ $ruangan->nama_ruangan }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>
    </form>

    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
            <table class="w-full border-collapse text-left text-sm">
                <thead>
                    <tr class="bg-[#455d97] text-white">
                        <th class="p-4 border-b border-[#3b4f80] border-r border-[#3b4f80] font-bold w-32 text-center uppercase tracking-wider">Hari</th>
                        <th class="p-4 border-b border-[#3b4f80] border-r border-[#3b4f80] font-bold w-48 text-center uppercase tracking-wider">Jam</th>
                        <th class="p-4 border-b border-[#3b4f80] border-r border-[#3b4f80] font-bold w-[35%] text-center uppercase tracking-wider">Kelas & Angkatan</th>
                        <th class="p-4 border-b border-[#3b4f80] font-bold uppercase text-center tracking-wider">Mata Kuliah</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    
                    @foreach($hariJadwal as $hari => $jamList)
                        @php $slotCount = count($jamList); @endphp
                        
                        @foreach($jamList as $index => $jam)
                            
                            @if($hari == 'JUMAT' && $index == 3)
                                <tr class="bg-emerald-500 text-white font-bold">
                                    <td class="p-3 text-center tracking-widest text-xs" colspan="3">
                                        <div class="flex items-center justify-center gap-2">
                                            <span class="material-symbols-outlined text-sm">mosque</span> JEDA SHALAT JUM'AT (11:30 - 13:30)
                                        </div>
                                    </td>
                                </tr>
                            @endif

                            <tr class="hover:bg-gray-50 transition-colors">
                                @if($index == 0)
                                    <td class="p-4 font-extrabold text-[#455d97] align-middle text-center bg-gray-50/50 border-r border-gray-200" rowspan="{{ $hari == 'JUMAT' ? $slotCount + 1 : $slotCount }}">
                                        {{ $hari }}
                                    </td>
                                @endif

                                <td class="p-4 font-mono text-gray-700 text-center font-bold border-r border-gray-200 bg-gray-50/30">
                                    {{ $jam }}
                                </td>
                                
                                <td class="p-4 border-r border-gray-200 text-center font-medium">
                                    @if(isset($jadwalMapped[$hari][$jam]))
                                        <span class="font-bold">
                                            {{ $jadwalMapped[$hari][$jam]->kelas->kelas }} 
                                            <span class="font-bold">{{ $jadwalMapped[$hari][$jam]->kelas->angkatan }}</span>
                                        </span>
                                    @else
                                        <span class="text-gray-400 font-bold">-</span>
                                    @endif
                                </td>
                                
                                <td class="p-4 font-medium text-center">
                                    @if(isset($jadwalMapped[$hari][$jam]))
                                        <div class="flex items-center justify-center gap-1 font-bold">
                                            <span>{{ $jadwalMapped[$hari][$jam]->matkul->nama_mk }}</span>
                                        </div>
                                    @else
                                        <span class="font-bold">-</span>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    @endforeach

                </tbody>
            </table>
        </div>
    </div>
</section>
@endsection