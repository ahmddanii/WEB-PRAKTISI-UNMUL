<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KoordinatorMatkul extends Model
{
    use HasFactory;

    protected $table = 'koordinator_matkul';

    protected $fillable = [
        'mata_kuliah_id',
        'nama',
        'nim',
        'foto',
        'email',
        'no_hp'
    ];

    public function matkul()
    {
        return $this->belongsTo(MataKuliah::class, 'mata_kuliah_id');
    }
}