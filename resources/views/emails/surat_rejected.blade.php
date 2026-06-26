<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6f9; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 0.5px; }
        .header p { margin: 5px 0 0 0; opacity: 0.8; font-size: 14px; }
        .content { padding: 35px; line-height: 1.6; }
        .content h2 { margin-top: 0; font-size: 18px; color: #b91c1c; }
        .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .details-table td { padding: 10px; border-bottom: 1px solid #edf2f7; font-size: 14px; }
        .details-table td.label { font-weight: bold; color: #4a5568; width: 35%; }
        .details-table td.value { color: #2d3748; }
        .notes-box { background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; border-radius: 4px; margin: 20px 0; font-size: 14px; color: #7f1d1d; }
        .footer { background-color: #f7fafc; padding: 20px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
        .btn { display: inline-block; padding: 12px 24px; background-color: #4a5568; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>PRAKTISI UNMUL</h1>
            <p>Pengajuan Surat Resmi</p>
        </div>
        <div class="content">
            <h2>Pengajuan Surat Anda DITOLAK</h2>
            <p>Halo <strong>{{ $pengajuan->nama }}</strong>,</p>
            <p>Kami memberitahukan bahwa pengajuan surat Anda telah ditinjau dan statusnya saat ini adalah <strong>DITOLAK</strong>.</p>
            
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
                    <td class="label">Status</td>
                    <td class="value"><span style="color: #ef4444; font-weight: bold;">DITOLAK</span></td>
                </tr>
            </table>

            <div class="notes-box">
                <strong>Alasan Penolakan:</strong><br>
                {{ $pengajuan->catatan ?? 'Tidak ada alasan penolakan spesifik yang dicantumkan.' }}
            </div>

            <p>Silakan lakukan perbaikan data atau ajukan kembali jika dirasa perlu melalui tautan di bawah ini:</p>
            <div style="text-align: center;">
                <a href="{{ url('/pengajuan-surat') }}" class="btn">Kembali ke Pengajuan Surat</a>
            </div>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} PRAKTISI - Program Studi Sistem Informasi FT Universitas Mulawarman.
        </div>
    </div>
</body>
</html>
