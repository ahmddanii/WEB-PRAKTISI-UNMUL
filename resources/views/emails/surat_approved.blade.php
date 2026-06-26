<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f6f9; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #10b981 0%, #047857 100%); padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 0.5px; }
        .header p { margin: 5px 0 0 0; opacity: 0.8; font-size: 14px; }
        .content { padding: 35px; line-height: 1.6; }
        .content h2 { margin-top: 0; font-size: 18px; color: #047857; }
        .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .details-table td { padding: 10px; border-bottom: 1px solid #edf2f7; font-size: 14px; }
        .details-table td.label { font-weight: bold; color: #4a5568; width: 35%; }
        .details-table td.value { color: #2d3748; }
        .notes-box { background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; margin: 20px 0; font-size: 14px; color: #1e3a1e; }
        .footer { background-color: #f7fafc; padding: 20px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; }
        .btn { display: inline-block; padding: 12px 24px; background-color: #10b981; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>PRAKTISI UNMUL</h1>
            <p>Pengajuan Surat Resmi</p>
        </div>
        <div class="content">
            <h2>Pengajuan Surat Anda DISETUJUI</h2>
            <p>Halo <strong>{{ $pengajuan->nama }}</strong>,</p>
            <p>Dengan gembira kami informasikan bahwa pengajuan surat Anda telah <strong>DISETUJUI</strong> oleh asisten laboratorium.</p>
            
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
                    <td class="value"><span style="color: #10b981; font-weight: bold;">DISETUJUI</span></td>
                </tr>
            </table>

            @if($pengajuan->catatan)
            <div class="notes-box">
                <strong>Catatan Admin / Aslab:</strong><br>
                {{ $pengajuan->catatan }}
            </div>
            @endif

            <p>Silakan klik tombol di bawah ini untuk mengunduh dokumen PDF resmi surat Anda:</p>
            <div style="text-align: center;">
                <a href="{{ $downloadUrl }}" class="btn">Unduh Surat Resmi (PDF)</a>
            </div>
            <p style="font-size: 12px; color: #718096; margin-top: 25px; text-align: center;">
                Tautan unduhan di atas terlindungi dan aman hanya untuk Anda.
            </p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} PRAKTISI - Program Studi Sistem Informasi FT Universitas Mulawarman.
        </div>
    </div>
</body>
</html>
