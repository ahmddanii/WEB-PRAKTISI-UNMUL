<?php

namespace App\Http\Controllers;

use App\Models\PengurusInti;
use App\Models\KoordinatorMatkul;
use App\Models\MataKuliah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PengurusController extends Controller
{
    public function index()
    {
        $pengurusInti = PengurusInti::orderBy('urutan', 'asc')->get();
        $koordinatorMatkul = KoordinatorMatkul::with('matkul')->latest()->get();
        $matkuls = MataKuliah::all(); // Diperlukan untuk dropdown pilihan mata kuliah

        return inertia('Admin/Pengurus/Index', compact('pengurusInti', 'koordinatorMatkul', 'matkuls'));
    }

    public function storeInti(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'nim_nip' => 'required|string|max:50',
            'jabatan' => 'required|string|max:100',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'email' => 'nullable|email',
            'no_hp' => 'nullable|string|max:20',
        ]);

        $data = $request->all();
        $urutanTerakhir = PengurusInti::max('urutan') ?? 0;
        $data['urutan'] = $urutanTerakhir + 1;

        if ($request->hasFile('foto')) {
            $data['foto'] = $this->handleImageUpload($request->file('foto'), 'pengurus');
        }

        PengurusInti::create($data);
        return redirect()->back()->with('success', 'Pengurus Inti berhasil ditambahkan!');
    }

    public function updateInti(Request $request, $id)
    {
        $pengurus = PengurusInti::findOrFail($id);
        $request->validate([
            'nama' => 'required|string|max:255',
            'nim_nip' => 'required|string|max:50',
            'jabatan' => 'required|string|max:100',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'email' => 'nullable|email',
            'no_hp' => 'nullable|string|max:20',
        ]);

        $data = $request->all();

        if ($request->hasFile('foto')) {
            if ($pengurus->foto) {
                Storage::disk('public')->delete($pengurus->foto);
            }
            $data['foto'] = $this->handleImageUpload($request->file('foto'), 'pengurus');
        }

        $pengurus->update($data);
        return redirect()->back()->with('success', 'Data Pengurus Inti berhasil diperbarui!');
    }

    public function destroyInti($id)
    {
        $pengurus = PengurusInti::findOrFail($id);
        if ($pengurus->foto) {
            Storage::disk('public')->delete($pengurus->foto);
        }
        $pengurus->delete();
        return redirect()->back()->with('success', 'Pengurus Inti berhasil dihapus!');
    }

    public function moveUpInti($id)
    {
        $current = PengurusInti::findOrFail($id);
        $previous = PengurusInti::where('urutan', '<', $current->urutan)->orderBy('urutan', 'desc')->first();

        if ($previous) {
            $tempUrutan = $current->urutan;
            $current->update(['urutan' => $previous->urutan]);
            $previous->update(['urutan' => $tempUrutan]);
        }

        return redirect()->back()->with('success', 'Urutan berhasil dinaikkan!');
    }

    public function moveDownInti($id)
    {
        $current = PengurusInti::findOrFail($id);
        $next = PengurusInti::where('urutan', '>', $current->urutan)->orderBy('urutan', 'asc')->first();

        if ($next) {
            $tempUrutan = $current->urutan;
            $current->update(['urutan' => $next->urutan]);
            $next->update(['urutan' => $tempUrutan]);
        }

        return redirect()->back()->with('success', 'Urutan berhasil diturunkan!');
    }

    public function storeKoor(Request $request)
    {
        $request->validate([
            'mata_kuliah_id' => 'required|exists:mata_kuliah,id',
            'nama' => 'required|string|max:255',
            'nim' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'email' => 'nullable|email',
            'no_hp' => 'nullable|string|max:20',
        ]);

        $data = $request->all();

        if ($request->hasFile('foto')) {
            $data['foto'] = $this->handleImageUpload($request->file('foto'), 'koordinator');
        }

        KoordinatorMatkul::create($data);
        return redirect()->back()->with('success', 'Koordinator Mata Kuliah berhasil ditambahkan!');
    }

    public function updateKoor(Request $request, $id)
    {
        $koor = KoordinatorMatkul::findOrFail($id);
        $request->validate([
            'mata_kuliah_id' => 'required|exists:mata_kuliah,id',
            'nama' => 'required|string|max:255',
            'nim' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'email' => 'nullable|email',
            'no_hp' => 'nullable|string|max:20',
        ]);

        $data = $request->all();

        if ($request->hasFile('foto')) {
            if ($koor->foto) {
                Storage::disk('public')->delete($koor->foto);
            }
            $data['foto'] = $this->handleImageUpload($request->file('foto'), 'koordinator');
        }

        $koor->update($data);
        return redirect()->back()->with('success', 'Data Koordinator berhasil diperbarui!');
    }

    public function destroyKoor($id)
    {
        $koor = KoordinatorMatkul::findOrFail($id);
        if ($koor->foto) {
            Storage::disk('public')->delete($koor->foto);
        }
        $koor->delete();
        return redirect()->back()->with('success', 'Koordinator berhasil dihapus!');
    }

    private function handleImageUpload($file, $folder)
    {
        $apiKey = config('services.remove_bg.api_key');

        if ($apiKey) {
            try {
                $response = Http::withHeaders([
                    'X-Api-Key' => $apiKey,
                ])->attach(
                    'image_file',
                    file_get_contents($file->getRealPath()),
                    $file->getClientOriginalName()
                )->post('https://api.remove.bg/v1.0/removebg', [
                    'size' => 'auto',
                ]);

                if ($response->successful()) {
                    $filename = $folder . '/' . Str::random(40) . '.png';
                    Storage::disk('public')->put($filename, $response->body());
                    return $filename;
                } else {
                    Log::warning('Remove.bg API failed: ' . $response->body());
                }
            } catch (\Exception $e) {
                Log::error('Error calling Remove.bg API: ' . $e->getMessage());
            }
        }

        // Fallback to storing local original file if API fails or key is missing
        return $file->store($folder, 'public');
    }
}