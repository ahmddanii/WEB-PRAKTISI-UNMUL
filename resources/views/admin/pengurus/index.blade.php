@extends('layouts.admin')

@section('title', 'Manajemen Pengurus & Koordinator')
@section('header_title', 'Pengurus & Koordinator')
@section('header_subtitle', 'Kelola data staf manajemen inti dan koordinator akademik mata kuliah.')

@section('content')
<link href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>

<section class="p-8">

    @if(session('success'))
        <div class="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 flex items-center gap-2 shadow-sm">
            <span class="material-symbols-outlined">check_circle</span>
            {{ session('success') }}
        </div>
    @endif

    <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h3 class="font-mono text-xl font-bold text-[#203971] tracking-wider">PENGURUS INTI</h3>
                <p class="text-sm text-gray-500 mt-1">Kelola jajaran manajemen inti dan eksekutif</p>
            </div>
            <button onclick="toggleModal('modal-inti-tambah')" class="bg-[#203971] text-white px-5 py-2.5 text-xs font-bold font-mono tracking-wider flex items-center gap-2 hover:bg-[#152a55] transition-all rounded shadow-sm">
                <span class="material-symbols-outlined text-sm">person_add</span> TAMBAH PENGURUS INTI
            </button>
        </div>
        
        <div class="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-200">
                        <th class="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">PROFIL</th>
                        <th class="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">JABATAN</th>
                        <th class="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">NIM/NIP</th>
                        <th class="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider text-center">AKSI</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($pengurusInti as $pi)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="p-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 aspect-[3/4] rounded border border-gray-200 overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center shadow-inner">
                                    @if($pi->foto)
                                        <img src="{{ asset('storage/' . $pi->foto) }}" class="w-full h-full object-cover">
                                    @else
                                        <span class="material-symbols-outlined text-gray-400">person</span>
                                    @endif
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-[#203971]">{{ $pi->nama }}</p>
                                    <p class="text-xs font-mono text-gray-500">{{ $pi->email ?? 'Tidak ada email' }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="p-4">
                            <span class="px-3 py-1 bg-[#203971]/10 text-[#203971] text-xs font-bold font-mono rounded">
                                {{ $pi->jabatan }}
                            </span>
                        </td>
                        <td class="p-4 text-sm font-mono text-gray-600">{{ $pi->nim_nip }}</td>
                        <td class="p-4">
                            <div class="flex justify-center items-center gap-1">
                                <form action="{{ route('pengurus.inti.up', $pi->id) }}" method="POST" class="inline">
                                    @csrf
                                    <button type="submit" title="Naikkan Urutan" class="p-1.5 text-gray-400 hover:text-[#203971] transition-colors"><span class="material-symbols-outlined text-lg">keyboard_arrow_up</span></button>
                                </form>
                                <form action="{{ route('pengurus.inti.down', $pi->id) }}" method="POST" class="inline">
                                    @csrf
                                    <button type="submit" title="Turunkan Urutan" class="p-1.5 text-gray-400 hover:text-[#203971] transition-colors"><span class="material-symbols-outlined text-lg">keyboard_arrow_down</span></button>
                                </form>
                                <button onclick="openEditInti({{ json_encode($pi) }})" title="Edit" class="p-1.5 text-gray-400 hover:text-green-600 transition-colors ml-2"><span class="material-symbols-outlined text-lg">edit</span></button>
                                <form action="{{ route('pengurus.inti.destroy', $pi->id) }}" method="POST" class="inline" onsubmit="return confirm('Yakin ingin menghapus pengurus ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" title="Hapus" class="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><span class="material-symbols-outlined text-lg">delete</span></button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="p-8 text-center text-gray-500">Belum ada data Pengurus Inti.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h3 class="font-mono text-xl font-bold text-[#203971] tracking-wider">KOORDINATOR MATA KULIAH</h3>
                <p class="text-sm text-gray-500 mt-1">Kelola data asisten laboratorium dan koordinator akademik</p>
            </div>
            <button onclick="toggleModal('modal-koor-tambah')" class="bg-[#203971] text-white px-5 py-2.5 text-xs font-bold font-mono tracking-wider flex items-center gap-2 hover:bg-[#152a55] transition-all rounded shadow-sm">
                <span class="material-symbols-outlined text-sm">person_add</span> TAMBAH KOORDINATOR
            </button>
        </div>
        
        <div class="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-200">
                        <th class="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">PROFIL</th>
                        <th class="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">MATA KULIAH</th>
                        <th class="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider">NIM</th>
                        <th class="p-4 font-mono text-xs font-bold text-gray-500 tracking-wider text-center">AKSI</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse($koordinatorMatkul as $km)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="p-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 aspect-[3/4] rounded border border-gray-200 overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center shadow-inner">
                                    @if($km->foto)
                                        <img src="{{ asset('storage/' . $km->foto) }}" class="w-full h-full object-cover">
                                    @else
                                        <span class="material-symbols-outlined text-gray-400">person</span>
                                    @endif
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-[#203971]">{{ $km->nama }}</p>
                                    <p class="text-xs font-mono text-gray-500">{{ $km->no_hp ?? 'Tidak ada nomor HP' }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="p-4">
                            @if($km->matkul)
                                <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold font-mono rounded border border-gray-200">
                                    {{ $km->matkul->nama_mk }}
                                </span>
                            @else
                                <span class="text-red-500 text-xs italic">Matkul Terhapus</span>
                            @endif
                        </td>
                        <td class="p-4 text-sm font-mono text-gray-600">{{ $km->nim }}</td>
                        <td class="p-4">
                            <div class="flex justify-center items-center gap-2">
                                <button onclick="openEditKoor({{ json_encode($km) }})" title="Edit" class="p-1.5 text-gray-400 hover:text-green-600 transition-colors"><span class="material-symbols-outlined text-lg">edit</span></button>
                                
                                <form action="{{ route('pengurus.koor.destroy', $km->id) }}" method="POST" class="inline" onsubmit="return confirm('Yakin ingin menghapus koordinator ini?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" title="Hapus" class="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><span class="material-symbols-outlined text-lg">delete</span></button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="p-8 text-center text-gray-500">Belum ada data Koordinator Mata Kuliah.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</section>

<div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 items-center justify-center p-4 hidden" id="modal-inti-tambah">
    <div class="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-xl overflow-hidden">
        <div class="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 class="font-mono font-bold text-lg text-[#203971]">Tambah Pengurus Inti</h3>
            <button class="text-gray-400 hover:text-[#203971]" onclick="toggleModal('modal-inti-tambah')"><span class="material-symbols-outlined">close</span></button>
        </div>
        <form action="{{ route('pengurus.inti.store') }}" method="POST" enctype="multipart/form-data" class="p-6 space-y-4">
            @csrf
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Nama Lengkap</label>
                <input type="text" name="nama" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">NIM / NIP</label>
                    <input type="text" name="nim_nip" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Jabatan</label>
                    <input type="text" name="jabatan" required placeholder="Cth: Ketua Laboratorium" class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email (Opsional)</label>
                    <input type="email" name="email" class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">No. HP (Opsional)</label>
                    <input type="text" name="no_hp" class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Foto Profil</label>
                <input type="file" name="foto" accept="image/*" onchange="handleImageSelect(event)" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#203971]/10 file:text-[#203971] hover:file:bg-[#203971]/20">
            </div>
            <div class="pt-4 flex gap-3">
                <button type="submit" class="flex-1 bg-[#203971] text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm">SIMPAN DATA</button>
                <button type="button" class="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm" onclick="toggleModal('modal-inti-tambah')">BATAL</button>
            </div>
        </form>
    </div>
</div>

<div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 items-center justify-center p-4 hidden" id="modal-inti-edit">
    <div class="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-xl overflow-hidden">
        <div class="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 class="font-mono font-bold text-lg text-green-600">Edit Data Pengurus Inti</h3>
            <button class="text-gray-400 hover:text-gray-600" onclick="toggleModal('modal-inti-edit')"><span class="material-symbols-outlined">close</span></button>
        </div>
        <form id="form-edit-inti" method="POST" enctype="multipart/form-data" class="p-6 space-y-4">
            @csrf
            @method('PUT')
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Nama Lengkap</label>
                <input type="text" id="edit-inti-nama" name="nama" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">NIM / NIP</label>
                    <input type="text" id="edit-inti-nim" name="nim_nip" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Jabatan</label>
                    <input type="text" id="edit-inti-jabatan" name="jabatan" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email</label>
                    <input type="email" id="edit-inti-email" name="email" class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">No. HP</label>
                    <input type="text" id="edit-inti-hp" name="no_hp" class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Ganti Foto Profil (Opsional)</label>
                <input type="file" name="foto" accept="image/*" onchange="handleImageSelect(event)" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100 text-gray-700">
            </div>
            <div class="pt-4 flex gap-3">
                <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm">SIMPAN PERUBAHAN</button>
                <button type="button" class="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm" onclick="toggleModal('modal-inti-edit')">BATAL</button>
            </div>
        </form>
    </div>
</div>

<div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 items-center justify-center p-4 hidden" id="modal-koor-tambah">
    <div class="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-xl overflow-hidden">
        <div class="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 class="font-mono font-bold text-lg text-[#203971]">Tambah Koordinator Matkul</h3>
            <button class="text-gray-400 hover:text-[#203971]" onclick="toggleModal('modal-koor-tambah')"><span class="material-symbols-outlined">close</span></button>
        </div>
        <form action="{{ route('pengurus.koor.store') }}" method="POST" enctype="multipart/form-data" class="p-6 space-y-4">
            @csrf
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Nama Lengkap Asisten</label>
                <input type="text" name="nama" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">NIM</label>
                    <input type="text" name="nim" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Pegang Mata Kuliah</label>
                    <select name="mata_kuliah_id" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                        <option value="">-- Pilih Mata Kuliah --</option>
                        @foreach($matkuls as $mk)
                            <option value="{{ $mk->id }}">{{ $mk->kode_mk }} - {{ $mk->nama_mk }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email</label>
                    <input type="email" name="email" class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">No. HP / WhatsApp</label>
                    <input type="text" name="no_hp" class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Pas Foto (3x4)</label>
                <input type="file" name="foto" accept="image/*" onchange="handleImageSelect(event)" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#203971]/10 file:text-[#203971]">
            </div>
            <div class="pt-4 flex gap-3">
                <button type="submit" class="flex-1 bg-[#203971] text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm">SIMPAN DATA</button>
                <button type="button" class="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm" onclick="toggleModal('modal-koor-tambah')">BATAL</button>
            </div>
        </form>
    </div>
</div>

<div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 items-center justify-center p-4 hidden" id="modal-koor-edit">
    <div class="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-xl overflow-hidden">
        <div class="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 class="font-mono font-bold text-lg text-green-600">Edit Data Koordinator</h3>
            <button class="text-gray-400 hover:text-gray-600" onclick="toggleModal('modal-koor-edit')"><span class="material-symbols-outlined">close</span></button>
        </div>
        <form id="form-edit-koor" method="POST" enctype="multipart/form-data" class="p-6 space-y-4">
            @csrf
            @method('PUT')
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Nama Lengkap Asisten</label>
                <input type="text" id="edit-koor-nama" name="nama" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">NIM</label>
                    <input type="text" id="edit-koor-nim" name="nim" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Pegang Mata Kuliah</label>
                    <select id="edit-koor-matkul" name="mata_kuliah_id" required class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                        @foreach($matkuls as $mk)
                            <option value="{{ $mk->id }}">{{ $mk->kode_mk }} - {{ $mk->nama_mk }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email</label>
                    <input type="email" id="edit-koor-email" name="email" class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">No. HP / WhatsApp</label>
                    <input type="text" id="edit-koor-hp" name="no_hp" class="w-full bg-white border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#203971] text-sm outline-none">
                </div>
            </div>
            <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Ganti Pas Foto (Opsional)</label>
                <input type="file" name="foto" accept="image/*" onchange="handleImageSelect(event)" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-100">
            </div>
            <div class="pt-4 flex gap-3">
                <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm">SIMPAN PERUBAHAN</button>
                <button type="button" class="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm" onclick="toggleModal('modal-koor-edit')">BATAL</button>
            </div>
        </form>
    </div>
</div>

<div class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-[60] items-center justify-center p-4 hidden" id="modal-cropper">
    <div class="bg-white w-full max-w-xl rounded-xl border border-gray-200 shadow-xl overflow-hidden flex flex-col">
        <div class="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 class="font-mono font-bold text-lg text-[#203971]">Sesuaikan Pas Foto</h3>
            <button type="button" class="text-gray-400 hover:text-red-500 transition-colors" onclick="closeCropper()">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div class="p-6 flex-1 flex justify-center items-center bg-gray-100 max-h-[60vh] overflow-hidden">
            <img id="image-to-crop" src="" alt="Gambar untuk di-crop" class="max-w-full max-h-full block">
        </div>
        <div class="p-4 border-t border-gray-200 flex gap-3 bg-white">
            <button type="button" id="btn-crop" class="flex-1 bg-[#203971] text-white py-2.5 rounded font-bold font-mono tracking-widest text-sm hover:bg-[#152a55] transition-colors">
                <span class="material-symbols-outlined align-middle text-sm mr-1">crop</span> POTONG & SIMPAN
            </button>
            <button type="button" class="px-6 border border-gray-300 rounded text-gray-600 font-bold font-mono text-sm hover:bg-gray-50 transition-colors" onclick="closeCropper()">BATAL</button>
        </div>
    </div>
</div>

<script>
    // Fungsi standar buka/tutup modal
    function toggleModal(id) {
        const modal = document.getElementById(id);
        modal.classList.toggle('hidden');
        modal.classList.toggle('flex');
    }

    // Mengisi data lama ke dalam form Edit Pengurus Inti
    function openEditInti(data) {
        document.getElementById('form-edit-inti').action = `/admin/pengurus/inti/${data.id}`;
        document.getElementById('edit-inti-nama').value = data.nama;
        document.getElementById('edit-inti-nim').value = data.nim_nip;
        document.getElementById('edit-inti-jabatan').value = data.jabatan;
        document.getElementById('edit-inti-email').value = data.email || '';
        document.getElementById('edit-inti-hp').value = data.no_hp || '';
        toggleModal('modal-inti-edit');
    }

    // Mengisi data lama ke dalam form Edit Koordinator Matkul
    function openEditKoor(data) {
        document.getElementById('form-edit-koor').action = `/admin/pengurus/koor/${data.id}`;
        document.getElementById('edit-koor-nama').value = data.nama;
        document.getElementById('edit-koor-nim').value = data.nim;
        document.getElementById('edit-koor-matkul').value = data.mata_kuliah_id;
        document.getElementById('edit-koor-email').value = data.email || '';
        document.getElementById('edit-koor-hp').value = data.no_hp || '';
        toggleModal('modal-koor-edit');
    }

    // --- LOGIKA CROPPER.JS ---
    let cropper;
    let currentFileInput;

    function handleImageSelect(event) {
        const files = event.target.files;
        
        if (files && files.length > 0) {
            currentFileInput = event.target;
            const reader = new FileReader();
            
            reader.onload = function (e) {
                const imageToCrop = document.getElementById('image-to-crop');
                imageToCrop.src = e.target.result;
                
                const modalCropper = document.getElementById('modal-cropper');
                modalCropper.classList.remove('hidden');
                modalCropper.classList.add('flex');

                if (cropper) {
                    cropper.destroy();
                }
                
                cropper = new Cropper(imageToCrop, {
                    aspectRatio: 3 / 4,
                    viewMode: 2,
                    autoCropArea: 1,
                });
            };
            
            reader.readAsDataURL(files[0]);
        }
    }

    function closeCropper() {
        const modalCropper = document.getElementById('modal-cropper');
        modalCropper.classList.add('hidden');
        modalCropper.classList.remove('flex');
        
        if (currentFileInput) {
            currentFileInput.value = ''; 
        }
        
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    }

    document.getElementById('btn-crop').addEventListener('click', function () {
        if (!cropper) return;

        cropper.getCroppedCanvas({
            width: 600,
            height: 800,
        }).toBlob(function (blob) {
            const fileName = "cropped_" + new Date().getTime() + ".jpg";
            const file = new File([blob], fileName, { 
                type: "image/jpeg", 
                lastModified: new Date().getTime() 
            });
            
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            currentFileInput.files = dataTransfer.files;

            const modalCropper = document.getElementById('modal-cropper');
            modalCropper.classList.add('hidden');
            modalCropper.classList.remove('flex');
            
            cropper.destroy();
            cropper = null;
            
        }, 'image/jpeg', 0.9);
    });
</script>

@endsection