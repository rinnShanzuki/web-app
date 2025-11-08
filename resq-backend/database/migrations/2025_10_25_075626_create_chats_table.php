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
        Schema::create('chats', function (Blueprint $table) {
            $table->id('id_chat');
            $table->foreignId('id_incident')->constrained('incidents', 'id_incident')->onDelete('cascade');
            $table->foreignId('id_client')->constrained('client_users', 'id_client')->onDelete('cascade');
            $table->foreignId('id_admin')->constrained('admin_users', 'id_admin')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
