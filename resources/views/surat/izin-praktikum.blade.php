<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Surat Keterangan Izin Praktikum</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
        }
        .page-wrapper {
            padding: 0.5in 0.5in 0.5in 0.5in;
        }
        .kop-table {
            width: 100%;
            border-collapse: collapse;
            border-bottom: 3px double #000;
            margin-bottom: 20px;
            padding-bottom: 10px;
        }
        .kop-logo {
            width: 80px;
            text-align: center;
            vertical-align: middle;
        }
        .kop-logo img {
            width: 75px;
            height: auto;
        }
        .kop-text {
            text-align: center;
            vertical-align: middle;
        }
        .kop-text .univ {
            font-size: 14pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 0;
        }
        .kop-text .fakultas {
            font-size: 13pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 0;
        }
        .kop-text .prodi {
            font-size: 12pt;
            font-weight: bold;
            margin: 0;
        }
        .kop-text .alamat {
            font-size: 9pt;
            font-style: italic;
            margin: 0;
            color: #333;
        }
        .title-section {
            text-align: center;
            margin-top: 15px;
            margin-bottom: 25px;
        }
        .title-section h2 {
            font-size: 13pt;
            font-weight: bold;
            text-decoration: underline;
            text-transform: uppercase;
            margin: 0;
        }
        .title-section p {
            font-size: 11pt;
            margin: 5px 0 0 0;
            font-family: 'Courier New', Courier, monospace;
        }
        .content-para {
            text-align: justify;
            margin-bottom: 15px;
            text-indent: 0.5in;
        }
        .data-table {
            width: 90%;
            margin: 15px auto;
            border-collapse: collapse;
        }
        .data-table td {
            padding: 4px 8px;
            vertical-align: top;
        }
        .data-table td.label {
            width: 30%;
        }
        .data-table td.colon {
            width: 3%;
            text-align: center;
        }
        .data-table td.value {
            width: 67%;
        }
        .pindah-sesi-box {
            border: 1px solid #000;
            padding: 12px 18px;
            margin: 20px 0;
            background-color: #fcfcfc;
        }
        .pindah-sesi-box h4 {
            margin: 0 0 8px 0;
            font-size: 11pt;
            text-transform: uppercase;
            font-weight: bold;
            text-decoration: underline;
        }
        .signature-container {
            margin-top: 40px;
            width: 100%;
        }
        .signature-table {
            width: 100%;
            border-collapse: collapse;
        }
        .signature-table td {
            vertical-align: top;
        }
        .signature-left {
            width: 60%;
        }
        .signature-right {
            width: 40%;
            text-align: left;
        }
        .qr-code-wrapper {
            margin: 10px 0;
            text-align: left;
        }
        .qr-code-wrapper img {
            border: 1px solid #ddd;
            padding: 2px;
            background: #fff;
        }
        .signature-name {
            font-weight: bold;
            text-decoration: underline;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="page-wrapper">
        <!-- Kop Surat -->
        <table class="kop-table">
            <tr>
                @if(file_exists(public_path('images/logo.png')))
                <td class="kop-logo">
                    <img src="{{ public_path('images/logo.png') }}" alt="Logo">
                </td>
                @endif
                <td class="kop-text">
                    <div class="univ">Universitas Mulawarman</div>
                    <div class="fakultas">Fakultas Teknik</div>
                    <div class="prodi">Program Studi Sistem Informasi — Laboratorium PRAKTISI</div>
                    <div class="alamat">Jl. Sambaliung, Kampus Gunung Kelua, Samarinda, Kalimantan Timur. Kode Pos 75119</div>
                </td>
            </tr>
        </table>

        <!-- Judul Surat -->
        <div class="title-section">
            <h2>Surat Keterangan Izin Praktikum</h2>
            <p>Nomor: {{ $nomorSurat }}</p>
        </div>

        <!-- Paragraf Pembuka -->
        <p class="content-para">
            Yang bertanda tangan di bawah ini, Pengurus Inti Laboratorium PRAKTISI Program Studi Sistem Informasi, Fakultas Teknik, Universitas Mulawarman menerangkan bahwa:
        </p>

        <!-- Data Pengurus (Penandatangan) -->
        <table class="data-table">
            <tr>
                <td class="label">Nama</td>
                <td class="colon">:</td>
                <td class="value"><strong>{{ $penandatangan->nama }}</strong></td>
            </tr>
            <tr>
                <td class="label">NIM / NIP</td>
                <td class="colon">:</td>
                <td class="value">{{ $penandatangan->nim_nip }}</td>
            </tr>
            <tr>
                <td class="label">Jabatan</td>
                <td class="colon">:</td>
                <td class="value">{{ $penandatangan->jabatan }}</td>
            </tr>
        </table>

        <!-- Paragraf Keterangan Mahasiswa -->
        <p class="content-para" style="text-indent: 0;">
            Menerangkan dengan sesungguhnya bahwa mahasiswa berikut:
        </p>

        <!-- Data Mahasiswa Pemohon -->
        <table class="data-table">
            <tr>
                <td class="label">Nama Mahasiswa</td>
                <td class="colon">:</td>
                <td class="value"><strong>{{ $pengajuan->nama }}</strong></td>
            </tr>
            <tr>
                <td class="label">NIM</td>
                <td class="colon">:</td>
                <td class="value">{{ $pengajuan->nim }}</td>
            </tr>
            <tr>
                <td class="label">Kelas / Sesi Asal</td>
                <td class="colon">:</td>
                <td class="value">{{ $pengajuan->kelas_sesi }}</td>
            </tr>
        </table>

        <!-- Alasan & Penjelasan Izin -->
        <p class="content-para" style="text-indent: 0; margin-top: 15px;">
            Diberikan izin untuk tidak mengikuti kegiatan praktikum mata kuliah <strong>{{ $pengajuan->matkul }}</strong> yang dilaksanakan pada tanggal <strong>{{ \Carbon\Carbon::parse($pengajuan->tanggal_praktikum)->translatedFormat('d F Y') }}</strong> dikarenakan: <em>"{{ $pengajuan->alasan }}"</em>.
        </p>

        <!-- Bagian Pindah Sesi (Muncul Kondisional) -->
        @if($pengajuan->sesi_tujuan)
        <div class="pindah-sesi-box">
            <h4>Persetujuan Perpindahan Sesi / Sesi Susulan</h4>
            <p style="margin: 0; font-size: 11pt;">
                Sehubungan dengan permohonan tersebut, mahasiswa yang bersangkutan juga diizinkan untuk mengikuti sesi susulan/pindahan praktikum pada:
            </p>
            <table style="width: 100%; margin-top: 5px; font-size: 11pt;">
                <tr>
                    <td style="width: 25%;">Sesi Pindah/Tujuan</td>
                    <td style="width: 3%; text-align: center;">:</td>
                    <td style="width: 72%;"><strong>{{ $pengajuan->sesi_tujuan }}</strong></td>
                </tr>
            </table>
        </div>
        @endif

        <!-- Penutup -->
        <p class="content-para">
            Demikian surat keterangan izin ini dibuat agar dapat dipergunakan sebagaimana mestinya dan untuk diketahui oleh koordinator asisten laboratorium yang bersangkutan.
        </p>

        <!-- Tanda Tangan -->
        <div class="signature-container">
            <table class="signature-table">
                <tr>
                    <td class="signature-left">
                        <!-- Space Kiri Sengaja Dikosongkan -->
                    </td>
                    <td class="signature-right">
                        <div>Samarinda, {{ \Carbon\Carbon::parse($pengajuan->diproses_at ?? now())->translatedFormat('d F Y') }}</div>
                        <div style="margin-top: 5px; font-weight: bold;">Ketua Pengurus Inti PRAKTISI,</div>
                        
                        <!-- QR Code Tanda Tangan Elektronik -->
                        @if(isset($qrCode))
                        <div class="qr-code-wrapper">
                            <img src="data:image/svg+xml;base64,{{ $qrCode }}" width="90" height="90" alt="QR Signature">
                        </div>
                        @else
                        <div style="height: 90px;"></div>
                        @endif

                        <div class="signature-name">{{ $penandatangan->nama }}</div>
                        <div>NIM. {{ $penandatangan->nim_nip }}</div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
