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
        Schema::create('prescription_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('prescription_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('medication_id')
                ->constrained();

            $table->string('dosage', 255)
                ->nullable();

            $table->string('duration', 255)
                ->nullable();

            $table->foreignId('available_branch_id')
                ->nullable()
                ->constrained('branches')
                ->nullOnDelete();

            $table->text('notes')->nullable();

            $table->timestamps();

            $table->unique(
                ['prescription_id', 'medication_id'],
                'uniq_prescription_medication'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_items');
    }
};
