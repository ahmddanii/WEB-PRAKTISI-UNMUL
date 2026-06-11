<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengurusInti extends Model
{
    use HasFactory;

    protected $table = 'pengurus_inti';

    protected $fillable = [
        'nama',
        'nim_nip',
        'jabatan',
        'foto',
        'email',
        'no_hp',
        'urutan'
    ];
}