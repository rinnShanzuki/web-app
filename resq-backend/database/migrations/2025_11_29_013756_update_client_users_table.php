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
        Schema::table('client_users', function (Blueprint $table) {
            // Drop old 'address' column
            $table->dropColumn('address');

            // Add new columns
            $table->string('street', 255)->nullable();
            $table->string('barangay', 255)->nullable();
            $table->string('municipality', 255)->nullable();
            $table->string('province', 255)->nullable();
            $table->integer('age')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('client_users', function (Blueprint $table) {
            $table->string('address', 255)->nullable();

            $table->dropColumn(['street','barangay','municipality','province','age']);
        });
    }

};
