<?php

namespace App\Mail;

use App\Models\Pengaduan;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PengaduanResponded extends Mailable
{
    use Queueable, SerializesModels;

    public Pengaduan $pengaduan;

    public function __construct(Pengaduan $pengaduan)
    {
        $this->pengaduan = $pengaduan;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Tanggapan Pengaduan Tiket - ' . $this->pengaduan->nomor_tiket,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.pengaduan_responded',
        );
    }
}
