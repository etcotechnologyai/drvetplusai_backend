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
        Schema::create('pet_vaccinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_id')->constrained()->cascadeOnDelete();
            $table->foreignId('vaccination_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('provider_assignment_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('branch_id')->nullable()->constrained()->nullOnDelete();
            $table->string('external_clinic_name')->nullable();
            $table->string('source', 20)->default('clinic')->index()->comment('clinic, user');
            $table->date('vaccination_date')->nullable();
            $table->date('next_due_date')->nullable()->index();
            $table->text('notes')->nullable();
            $table->foreignId('media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->boolean('is_verified')->default(false)->index();
            $table->timestamps();
            $table->index(['pet_id', 'next_due_date'], 'idx_pet_due_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet_vaccinations');
    }
};
