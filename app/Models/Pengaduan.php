<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengaduan extends Model
{
    protected $table = 'pengaduans';

    protected $fillable = [
        'nomor_tiket',
        'kategori',
        'nama',
        'nim',
        'email',
        'no_hp',
        'matkul_terkait',
        'judul',
        'isi',
        'lampiran',
        'status',
        'respons',
    ];

    /**
     * Generate secure token for status checking based on ID, NIM, and APP_KEY.
     */
    public function generateToken(): string
    {
        return hash_hmac('sha256', $this->id . '-' . $this->nim, config('app.key'));
    }
}
