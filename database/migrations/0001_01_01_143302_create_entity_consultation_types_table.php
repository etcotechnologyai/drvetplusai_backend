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
        Schema::create('entity_consultation_types', function (Blueprint $table) {
            $table->id();
            $table->morphs('entity');
            $table->foreignId('consultation_type_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(
                ['entity_id', 'entity_type', 'consultation_type_id'],
                'uniq_entity_consultation'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entity_consultation_types');
    }
};
