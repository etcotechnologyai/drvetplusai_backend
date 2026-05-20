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
        Schema::create('locationables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->constrained()->cascadeOnDelete();
            $table->morphs('locationable');
            $table->boolean('is_primary')->default(true)->index();
            $table->timestamps();
            $table->unique(
                ['location_id', 'locationable_id', 'locationable_type'],
                'uniq_locationable'
            );
            $table->index(
                ['locationable_type', 'locationable_id', 'is_primary'],
                'idx_primary_lookup'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locationables');
    }
};
