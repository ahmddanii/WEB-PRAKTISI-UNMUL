<?php

namespace App\Mail;

use App\Models\PengajuanSurat;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SuratRejected extends Mailable
{
    use Queueable, SerializesModels;

    public PengajuanSurat $pengajuan;

    public function __construct(PengajuanSurat $pengajuan)
    {
        $this->pengajuan = $pengajuan;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pengajuan Surat DITOLAK - ' . $this->pengajuan->nomor_pengajuan,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.surat_rejected',
        );
    }
}
