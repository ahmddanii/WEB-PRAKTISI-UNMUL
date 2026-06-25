<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\PengurusInti;
use App\Models\MataKuliah;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'totalBerita' => Berita::count(),
            'totalPengurus' => PengurusInti::count(),
            'totalMatkul' => MataKuliah::count(),
        ];

        return inertia('Admin/Dashboard', $data);
    }
}