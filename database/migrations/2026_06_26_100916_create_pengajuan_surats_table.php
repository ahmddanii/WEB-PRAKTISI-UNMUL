<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengajuan_surats', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_pengajuan')->nullable()->unique();
            $table->string('jenis_surat');
            $table->string('nama');
            $table->string('nim');
            $table->string('email');
            $table->string('no_hp')->nullable();
            $table->string('matkul');
            $table->string('kelas_sesi')->nullable();
            $table->date('tanggal_praktikum');
            $table->string('sesi_asal')->nullable();
            $table->string('sesi_tujuan')->nullable();
            $table->text('alasan');
            $table->string('file_bukti')->nullable();
            $table->string('file_surat')->nullable();
            $table->string('status')->default('Menunggu'); // Menunggu, Disetujui, Ditolak
            $table->text('catatan')->nullable();
            $table->string('token')->nullable()->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuan_surats');
    }
};
