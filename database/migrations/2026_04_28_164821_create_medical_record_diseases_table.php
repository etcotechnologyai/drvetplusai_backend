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
        Schema::create('medical_record_diseases', function (Blueprint $table) {
            $table->id();

            $table->foreignId('medical_record_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('disease_id')
                ->constrained();

            $table->text('notes')->nullable();

            $table->timestamps();

            $table->unique(
                ['medical_record_id', 'disease_id'],
                'uniq_record_disease'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_record_diseases');
    }
};
