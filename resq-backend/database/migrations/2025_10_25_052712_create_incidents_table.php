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
        Schema::create('incidents', function (Blueprint $table) {
            $table->id('id_incident');
            $table->text('description');
            $table->timestamp('reported_at')->useCurrent();
            $table->timestamp('resolved_at')->nullable();
            $table->foreignId('id_intype')->constrained('incident_types', 'id_intype')->onDelete('cascade');
            $table->foreignId('id_instatus')->constrained('incident_statuses', 'id_instatus')->onDelete('cascade');
            $table->foreignId('id_plevel')->constrained('priority_levels', 'id_plevel')->onDelete('cascade');
            $table->foreignId('id_inlocation')->constrained('incident_locations', 'id_inlocation')->onDelete('cascade');
            $table->foreignId('id_client')->constrained('client_users', 'id_client')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};
