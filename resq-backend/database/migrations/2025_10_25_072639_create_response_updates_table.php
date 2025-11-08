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
        Schema::create('response_updates', function (Blueprint $table) {
            $table->id('id_resupdate');
            $table->decimal('latitude',10,7);
            $table->decimal('longitude',10,7);
            $table->text('update_message')->nullable();
            $table->foreignId('id_responder')->constrained('responders', 'id_responder')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('response_updates');
    }
};
