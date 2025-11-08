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
        Schema::create('agency_personnels', function (Blueprint $table) {
            $table->id('id_ap');
            $table->string('name',100);
            $table->string('designation',100);
            $table->string('email',100)->unique();
            $table->string('contact_no',20)->nullable();
            $table->boolean('on_duty')->default(false);
             $table->foreignId('id_agency')->constrained('agencies', 'id_agency')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agency_personnels');
    }
};
