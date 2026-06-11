<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelasPraktikum extends Model
{
    use HasFactory;

    protected $table = 'kelas_praktikum';

    protected $fillable = [
        'kelas',
        'angkatan'
    ];
}