<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6f9; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #203971 0%, #121c38 100%); padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 0.5px; }
        .header p { margin: 5px 0 0 0; opacity: 0.8; font-size: 14px; }
        .content { padding: 35px; line-height: 1.6; }
        .content h2 { margin-top: 0; font-size: 18px; color: #203971; }
        .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .details-table td { padding: 10px; border-bottom: 1px solid #edf2f7; font-size: 14px; }
        .details-table td.label { font-weight: bold; color: #4a5568; width: 35%; }
        .details-table td.value { color: #2d3748; }
        .footer { background-color: #f7fafc; padding: 20px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
        .btn { display: inline-block; padding: 12px 24px; background-color: #203971; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>PRAKTISI UNMUL</h1>
            <p>Web Praktikum Sistem Informasi</p>
        </div>
        <div class="content">
            <h2>Konfirmasi Pengajuan Surat</h2>
            <p>Halo <strong>{{ $pengajuan->nama }}</strong>,</p>
            <p>Pengajuan surat Anda telah berhasil kami terima. Berikut adalah rangkuman rincian pengajuan Anda:</p>
            
            <table class="details-table">
                <tr>
                    <td class="label">Nomor Pengajuan</td>
                    <td class="value"><strong>{{ $pengajuan->nomor_pengajuan }}</strong></td>
                </tr>
                <tr>
                    <td class="label">Jenis Surat</td>
                    <td class="value">{{ $pengajuan->jenis_surat }}</td>
                </tr>
                <tr>
                    <td class="label">NIM</td>
                    <td class="value">{{ $pengajuan->nim }}</td>
                </tr>
                <tr>
                    <td class="label">Mata Kuliah</td>
                    <td class="value">{{ $pengajuan->matkul }}</td>
                </tr>
                <tr>
                    <td class="label">Tanggal Praktikum</td>
                    <td class="value">{{ $pengajuan->tanggal_praktikum->format('d-m-Y') }}</td>
                </tr>
                @if($pengajuan->sesi_tujuan)
                <tr>
                    <td class="label">Pindah Sesi (Sesi Tujuan)</td>
                    <td class="value">Ke {{ $pengajuan->sesi_tujuan }}</td>
                </tr>
                @endif
            </table>

            <p>Pengajuan Anda saat ini sedang menunggu tinjauan dari Admin. Hasil keputusan (Disetujui/Ditolak) akan otomatis kami kirimkan ke email ini.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} PRAKTISI - Program Studi Sistem Informasi FT Universitas Mulawarman.
        </div>
    </div>
</body>
</html>
