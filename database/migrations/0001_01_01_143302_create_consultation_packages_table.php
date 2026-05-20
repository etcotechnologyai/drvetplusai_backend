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
        Schema::create('consultation_packages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('account_id')->constrained()->cascadeOnDelete();

            $table->string('title');
            $table->text('description')->nullable();

            $table->unsignedInteger('total_consultations');

            $table->decimal('price', 10, 2);

            $table->foreignId('consultation_type_id')->constrained();

            $table->boolean('is_active')->default(true)->index();

            $table->timestamps();
            $table->index(['account_id', 'is_active'], 'idx_pkg_account_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_packages');
    }
};
