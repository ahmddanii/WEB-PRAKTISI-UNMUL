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
        Schema::create('pengaduans', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_tiket')->nullable()->unique();
            $table->string('kategori');
            $table->string('nama');
            $table->string('nim');
            $table->string('email');
            $table->string('no_hp')->nullable();
            $table->string('matkul_terkait')->nullable();
            $table->string('judul');
            $table->text('isi');
            $table->string('lampiran')->nullable();
            $table->string('status')->default('Baru'); // Baru, Diproses, Selesai
            $table->text('respons')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaduans');
    }
};
