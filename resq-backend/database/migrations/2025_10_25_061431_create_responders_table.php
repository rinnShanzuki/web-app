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
        Schema::create('responders', function (Blueprint $table) {
            $table->id('id_responder');
            $table->enum('status',['active','inactive'])->default('active');
            $table->dateTime('start_time')->nullable();
            $table->dateTime('arrival_time')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->text('remarks')->nullable();
            $table->foreignId('id_ap')->constrained('agency_personnels', 'id_ap')->onDelete('cascade');
            $table->foreignId('id_incident')->constrained('incidents', 'id_incident')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responders');
    }
};
