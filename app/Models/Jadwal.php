<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;

    protected $table = 'jadwal';

    protected $fillable = [
        'ruangan_id',
        'hari',
        'jam_mulai',
        'jam_selesai',
        'kelas_id',
        'mata_kuliah_id'
    ];

    public function ruangan() {
        return $this->belongsTo(Ruangan::class, 'ruangan_id');
    }
    public function kelas() {
        return $this->belongsTo(KelasPraktikum::class, 'kelas_id');
    }
    public function matkul() {
        return $this->belongsTo(MataKuliah::class, 'mata_kuliah_id');
    }
}