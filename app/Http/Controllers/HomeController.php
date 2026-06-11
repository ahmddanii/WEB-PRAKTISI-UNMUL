<?php

namespace App\Http\Controllers;

use App\Models\Berita;

class HomeController extends Controller
{
    public function index()
    {
        $beritaTerbaru = Berita::latest()
            ->take(3)
            ->get();

        return view('home', compact('beritaTerbaru'));
    }
}