<?php

namespace App\Mail;

use App\Models\PengajuanSurat;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SuratApproved extends Mailable
{
    use Queueable, SerializesModels;

    public PengajuanSurat $pengajuan;
    public string $downloadUrl;

    public function __construct(PengajuanSurat $pengajuan)
    {
        $this->pengajuan = $pengajuan;
        $this->downloadUrl = route('surat.download', [
            'id' => $pengajuan->id,
            'token' => $pengajuan->generateToken()
        ]);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pengajuan Surat DISETUJUI - ' . $this->pengajuan->nomor_pengajuan,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.surat_approved',
        );
    }
}
