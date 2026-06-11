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
        Schema::create('pengurus_inti', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nim_nip');
            $table->string('jabatan');
            $table->string('foto')->nullable();
            $table->string('email')->nullable();
            $table->string('no_hp')->nullable();
            $table->integer('urutan')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengurus_inti');
    }
};
