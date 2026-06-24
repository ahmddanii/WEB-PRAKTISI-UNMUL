<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $totalBerita = Berita::count();
        
        $query = Berita::latest();

        if ($request->has('search') && $request->search != '') {
            $query->where('judul', 'like', '%' . $request->search . '%')
                ->orWhere('author', 'like', '%' . $request->search . '%');
        }

        $berita = $query->paginate(10);
        
        $berita->appends(['search' => $request->search]);

        return view('admin.berita.index', compact('berita', 'totalBerita'));
    }

    public function create()
    {
        return view('admin.berita.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul'     => 'required|string|max:255',
            'author'    => 'required|string|max:255',
            'kategori'  => 'required|string',
            'isi'       => 'required',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('berita', 'public');
        }

        Berita::create([
            'judul'     => $request->judul,
            'slug'      => Str::slug($request->judul),
            'author'    => $request->author,
            'kategori'  => $request->kategori,
            'isi'       => $request->isi,
            'thumbnail' => $thumbnailPath,
        ]);

        return redirect('/admin/berita')->with('success', 'Berita berhasil diterbitkan!');
    }


    public function edit($id)
    {
        $berita = Berita::findOrFail($id);
        return view('admin.berita.edit', compact('berita'));
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $request->validate([
            'judul'     => 'required|string|max:255',
            'author'    => 'required|string|max:255',
            'kategori'  => 'required|string',
            'isi'       => 'required',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'judul'    => $request->judul,
            'slug'     => Str::slug($request->judul),
            'author'   => $request->author,
            'kategori' => $request->kategori,
            'isi'      => $request->isi,
        ];

        if ($request->hasFile('thumbnail')) {
            // Menghapus gambar lama menggunakan Facades Storage
            if ($berita->thumbnail) {
                Storage::disk('public')->delete($berita->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('berita', 'public');
        }

        $berita->update($data);

        return redirect('/admin/berita')->with('success', 'Berita berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);

        if ($berita->thumbnail) {
            Storage::disk('public')->delete($berita->thumbnail);
        }

        $berita->delete();

        return redirect('/admin/berita')->with('success', 'Berita berhasil dihapus!');
    }
}