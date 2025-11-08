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
        Schema::create('incident_locations', function (Blueprint $table) {
            $table->id('id_inlocation');
            $table->string('street',150)->nullable();
            $table->string('barangay',100);
            $table->string('city',100);
            $table->string('province',100);
            $table->string('region',100)->nullable();
            $table->string('postal_code',10)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incident_locations');
    }
};
