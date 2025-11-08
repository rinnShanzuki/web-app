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
        Schema::create('client_users', function (Blueprint $table) {
            $table->id('id_client');
            $table->string('name', 100);
            $table->string('contact_no', 20);
            $table->string('email', 100)->unique();
            $table->string('password');
            $table->string('address', 255)->nullable();
            $table->enum('gender', ['male','female','other'])->nullable();
            $table->date('birthdate')->nullable();
            $table->string('photo', 255)->nullable();
            $table->enum('status',['active','inactive'])->default('active');
            $table->dateTime('last_login')->nullable();
            $table->foreignId('id_role')->constrained('roles', 'id_role')->nDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_users');
    }
};
