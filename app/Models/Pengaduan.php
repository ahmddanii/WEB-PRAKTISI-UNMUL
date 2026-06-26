<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengaduan extends Model
{
    use HasFactory;

    protected $table = 'pengaduan';

    protected $fillable = [
        'kategori',
        'angkatan',
        'mata_kuliah_id',
        'isi_pengaduan',
        'file_lampiran',
        'nama_pelapor',
        'nim_pelapor',
        'status',
        'dibahas_at',
        'dibahas_oleh',
    ];

    protected $casts = [
        'dibahas_at' => 'datetime',
    ];

    protected $appends = [
        'pelapor',
        'kategori_label',
        'nomor_tiket'
    ];

    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class, 'mata_kuliah_id');
    }

    public function dibahasOleh()
    {
        return $this->belongsTo(User::class, 'dibahas_oleh');
    }

    /**
     * Accessor for pelapor display name.
     */
    public function getPelaporAttribute(): string
    {
        if (!$this->nama_pelapor) {
            return 'Anonim';
        }
        return $this->nim_pelapor
            ? "{$this->nama_pelapor} ({$this->nim_pelapor})"
            : $this->nama_pelapor;
    }

    /**
     * Accessor for capitalized kategori label.
     */
    public function getKategoriLabelAttribute(): string
    {
        return match($this->kategori) {
            'keluhan'    => 'Keluhan',
            'saran'      => 'Saran',
            'pertanyaan' => 'Pertanyaan',
            'lainnya'    => 'Lainnya',
            default      => '-',
        };
    }

    /**
     * Accessor for derived nomor_tiket.
     */
    public function getNomorTiketAttribute(): string
    {
        return '#T' . str_pad($this->id, 5, '0', STR_PAD_LEFT);
    }

    /**
     * Helper to check if already discussed.
     */
    public function sudahDibahas(): bool
    {
        return $this->status === 'sudah_dibahas';
    }
}
