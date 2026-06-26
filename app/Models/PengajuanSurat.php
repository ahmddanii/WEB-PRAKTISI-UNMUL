<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengajuanSurat extends Model
{
    protected $table = 'pengajuan_surats';

    protected $fillable = [
        'nomor_pengajuan',
        'jenis_surat',
        'nama',
        'nim',
        'email',
        'no_hp',
        'matkul',
        'kelas_sesi',
        'tanggal_praktikum',
        'sesi_asal',
        'sesi_tujuan',
        'alasan',
        'file_bukti',
        'file_surat',
        'status',
        'catatan',
        'token',
        'diproses_oleh',
        'diproses_at',
    ];

    protected $casts = [
        'tanggal_praktikum' => 'date',
        'diproses_at' => 'datetime',
    ];

    public function diprosesOleh()
    {
        return $this->belongsTo(User::class, 'diproses_oleh');
    }

    /**
     * Generate secure token for download link based on ID, NIM, and APP_KEY.
     */
    public function generateToken(): string
    {
        return hash_hmac('sha256', $this->id . '-' . $this->nim, config('app.key'));
    }
}
