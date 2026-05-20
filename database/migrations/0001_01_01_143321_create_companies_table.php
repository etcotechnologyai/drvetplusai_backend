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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();

            $table->foreignId('account_id')->constrained()->cascadeOnDelete();
            $table->foreignId('activity_id')->constrained()->restrictOnDelete();

            $table->string('name', 150);
            $table->string('legal_name', 150)->nullable();

            $table->string('registration_number', 50)
                ->nullable()
                ->unique();

            $table->boolean('has_medical_services')->default(false)->index();
            $table->boolean('has_pharmacy')->default(false)->index();
            $table->boolean('has_lab')->default(false)->index();

            $table->boolean('is_active')->default(true)->index();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['account_id', 'activity_id'], 'idx_account_activity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
