<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('country_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('region_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('city_id')->nullable()->constrained()->nullOnDelete();

            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);

            $table->string('address_line')->nullable();
            $table->string('postal_code', 10)->nullable();

            $table->string('building_number', 10)->nullable();
            $table->string('street', 150)->nullable();
            $table->string('district', 150)->nullable();
            $table->string('additional_number', 10)->nullable();
            $table->string('unit_number', 50)->nullable();

            $table->timestamps();

            $table->index('city_id');
            $table->index(['latitude', 'longitude'], 'idx_geo');
            $table->index('postal_code');
            $table->index(['country_id', 'region_id', 'city_id'], 'idx_location_hierarchy');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
