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
        Schema::create('dispatch_logs', function (Blueprint $table) {
            $table->id('id_dislog');
            $table->dateTime('dispatch_time');
            $table->enum('status',['Sent','Accepted','Declined'])->default('Sent');
            $table->foreignId('id_incident')->constrained('incidents', 'id_incident')->onDelete('cascade');
            $table->foreignId('id_admin')->constrained('admin_users', 'id_admin')->onDelete('cascade');
            $table->foreignId('id_agency')->constrained('agencies', 'id_agency')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dispatch_logs');
    }
};
