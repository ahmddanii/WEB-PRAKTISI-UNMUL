@extends('layouts.admin')

@section('title', 'Edit Berita')
@section('header_title', 'Edit Berita')
@section('header_subtitle', 'Perbarui informasi dan konten berita yang sudah diterbitkan.')

@section('content')
<section class="p-8">
    
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-4xl">
        <form action="/admin/berita/{{ $berita->id }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="p-8 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="md:col-span-2">
                        <label class="block text-sm font-bold text-[#203971] mb-2">Judul Artikel <span class="text-[#F32923]">*</span></label>
                        <input type="text" name="judul" value="{{ old('judul', $berita->judul) }}" required placeholder="Contoh: Pembaruan Jadwal Praktikum Ganjil" class="w-full h-12 bg-gray-50 border @error('judul') border-[#F32923] @else border-gray-300 @enderror rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all">
                        @error('judul') <p class="text-[#F32923] text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-[#203971] mb-2">Penulis (Author) <span class="text-[#F32923]">*</span></label>
                        <input type="text" name="author" value="{{ old('author', $berita->author) }}" required placeholder="Contoh: Tim Laboratorium" class="w-full h-12 bg-gray-50 border @error('author') border-[#F32923] @else border-gray-300 @enderror rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all">
                        @error('author') <p class="text-[#F32923] text-xs mt-1">{{ $message }}</p> @enderror
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-bold text-[#203971] mb-2">Kategori <span class="text-[#F32923]">*</span></label>
                        <select name="kategori" required class="w-full h-12 bg-gray-50 border @error('kategori') border-[#F32923] @else border-gray-300 @enderror rounded-lg px-4 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all">
                            <option value="">-- Pilih Kategori --</option>
                            <option value="Pengumuman" {{ old('kategori', $berita->kategori) == 'Pengumuman' ? 'selected' : '' }}>Pengumuman</option>
                            <option value="Berita" {{ old('kategori', $berita->kategori) == 'Berita' ? 'selected' : '' }}>Berita Akademik</option>
                            <option value="Workshop" {{ old('kategori', $berita->kategori) == 'Workshop' ? 'selected' : '' }}>Workshop / Kegiatan</option>
                        </select>
                        @error('kategori') <p class="text-[#F32923] text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-[#203971] mb-2">Thumbnail / Gambar Sampul</label>
                        <input type="file" name="thumbnail" accept="image/*" class="w-full bg-gray-50 border @error('thumbnail') border-[#F32923] @else border-gray-300 @enderror rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#203971] file:text-white hover:file:bg-[#152a55]">
                        <p class="text-xs text-gray-500 mt-1">Format: JPG, PNG, WEBP. Kosongkan jika tidak ingin mengubah gambar.</p>
                        
                        @if($berita->thumbnail)
                            <div class="mt-3 flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg w-fit">
                                <img src="{{ asset('storage/' . $berita->thumbnail) }}" alt="Thumbnail Saat Ini" class="w-16 h-16 object-cover rounded shadow-sm">
                                <div class="text-xs text-gray-500">
                                    <span class="font-bold text-gray-700 block">Gambar Saat Ini</span>
                                    Akan terganti jika Anda mengupload file baru.
                                </div>
                            </div>
                        @endif
                        @error('thumbnail') <p class="text-[#F32923] text-xs mt-1">{{ $message }}</p> @enderror
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-bold text-[#203971] mb-2">Isi Berita <span class="text-[#F32923]">*</span></label>
                    <textarea name="isi" required rows="10" placeholder="Tuliskan isi lengkap berita atau pengumuman di sini..." class="w-full bg-gray-50 border @error('isi') border-[#F32923] @else border-gray-300 @enderror rounded-lg p-4 text-gray-800 focus:ring-2 focus:ring-[#203971] focus:border-[#203971] outline-none transition-all">{{ old('isi', $berita->isi) }}</textarea>
                    @error('isi') <p class="text-[#F32923] text-xs mt-1">{{ $message }}</p> @enderror
                </div>
            </div>

            <div class="px-8 py-5 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <a href="/admin/berita" class="text-gray-500 hover:text-gray-800 font-medium text-sm flex items-center gap-1 transition-colors">
                    <span class="material-symbols-outlined text-sm">arrow_back</span> Batal & Kembali
                </a>
                <button type="submit" class="bg-[#203971] hover:bg-[#152a55] text-white px-6 py-2.5 font-bold rounded-lg shadow-md transition-all flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">save</span> Simpan Perubahan
                </button>
            </div>

        </form>
    </div>

</section>
@endsection