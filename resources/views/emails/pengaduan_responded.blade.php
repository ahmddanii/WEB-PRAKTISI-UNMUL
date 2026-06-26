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
        .response-box { background-color: #f7fafc; border-left: 4px solid #203971; padding: 20px; border-radius: 4px; margin: 20px 0; font-size: 14px; color: #2d3748; line-height: 1.7; font-style: italic; }
        .footer { background-color: #f7fafc; padding: 20px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
        .btn { display: inline-block; padding: 12px 24px; background-color: #203971; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>PRAKTISI UNMUL</h1>
            <p>Pusat Pengaduan & Aspirasi</p>
        </div>
        <div class="content">
            <h2>Tanggapan Atas Pengaduan Anda</h2>
            <p>Halo <strong>{{ $pengaduan->nama }}</strong>,</p>
            <p>Pengaduan Anda dengan nomor tiket <strong>{{ $pengaduan->nomor_tiket }}</strong> telah ditanggapi oleh asisten laboratorium.</p>
            
            <table class="details-table">
                <tr>
                    <td class="label">Nomor Tiket</td>
                    <td class="value"><strong>{{ $pengaduan->nomor_tiket }}</strong></td>
                </tr>
                <tr>
                    <td class="label">Judul Pengaduan</td>
                    <td class="value">{{ $pengaduan->judul }}</td>
                </tr>
                <tr>
                    <td class="label">Status Terbaru</td>
                    <td class="value"><strong>{{ $pengaduan->status }}</strong></td>
                </tr>
            </table>

            <div class="response-box">
                <strong>Tanggapan Aslab:</strong><br>
                "{!! nl2br(e($pengaduan->respons)) !!}"
            </div>

            <p>Untuk melihat detail pengaduan dan menanggapi balik, Anda dapat mengklik tombol di bawah ini:</p>
            <div style="text-align: center;">
                <a href="{{ url('/pengaduan/cek-status') }}" class="btn">Lihat Detail Pengaduan</a>
            </div>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} PRAKTISI - Program Studi Sistem Informasi FT Universitas Mulawarman.
        </div>
    </div>
</body>
</html>
