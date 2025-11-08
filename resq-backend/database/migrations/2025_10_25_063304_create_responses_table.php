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
        Schema::create('responses', function (Blueprint $table) {
            $table->id('id_response');
            $table->dateTime('start_time')->nullable();
            $table->dateTime('arrival_time')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->text('remarks')->nullable();
            $table->enum('status',['Pending','Ongoing','Completed'])->default('Pending');
            $table->foreignId('id_incident')->constrained('incidents', 'id_incident')->onDelete('cascade');
            $table->foreignId('id_agency')->constrained('agencies', 'id_agency')->onDelete('cascade');
            $table->foreignId('id_responder')->constrained('responders', 'id_responder')->onDelete('cascade');;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('responses');
    }
};
