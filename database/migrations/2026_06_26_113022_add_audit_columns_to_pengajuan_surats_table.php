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
        Schema::table('pengajuan_surats', function (Blueprint $table) {
            $table->unsignedBigInteger('diproses_oleh')->nullable()->after('token');
            $table->timestamp('diproses_at')->nullable()->after('diproses_oleh');

            $table->foreign('diproses_oleh')->references('id')->on('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengajuan_surats', function (Blueprint $table) {
            $table->dropForeign(['diproses_oleh']);
            $table->dropColumn(['diproses_oleh', 'diproses_at']);
        });
    }
};
