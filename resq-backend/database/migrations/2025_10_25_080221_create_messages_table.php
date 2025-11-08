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
        Schema::create('messages', function (Blueprint $table) {
            $table->id('id_message');
            $table->text('content');
            $table->enum('type',['text','image','file'])->default('text');
            $table->dateTime('timestamp');
            $table->boolean('is_read')->default(false);
            $table->foreignId('id_chat')->constrained('chats', 'id_chat')->onDelete('cascade');
            $table->foreignId('id_client')->constrained('client_users', 'id_client')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
