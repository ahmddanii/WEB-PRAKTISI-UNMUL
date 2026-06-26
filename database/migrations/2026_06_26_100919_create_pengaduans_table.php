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
        Schema::create('pengaduan', function (Blueprint $table) {
            $table->id();
            $table->enum('kategori', ['keluhan', 'saran', 'pertanyaan', 'lainnya']);
            $table->year('angkatan');
            $table->foreignId('mata_kuliah_id')->nullable()->constrained('mata_kuliah')->nullOnDelete();
            $table->text('isi_pengaduan');
            $table->string('file_lampiran')->nullable();

            // Identitas opsional
            $table->string('nama_pelapor', 100)->nullable();
            $table->string('nim_pelapor', 20)->nullable();

            // Status rapat
            $table->enum('status', ['baru', 'sudah_dibahas'])->default('baru');
            $table->timestamp('dibahas_at')->nullable();
            $table->foreignId('dibahas_oleh')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaduan');
    }
};
