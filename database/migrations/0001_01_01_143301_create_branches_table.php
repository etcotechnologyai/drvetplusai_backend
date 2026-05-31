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
        Schema::create('branches', function (Blueprint $table) {
            $table->id();

            $table->foreignId('account_id')->constrained()->cascadeOnDelete();

            $table->string('name', 150);

            $table->boolean('is_main')->default(false)->index();

            $table->foreignId('activity_id')->nullable()->constrained()->nullOnDelete();

            $table->unsignedBigInteger('location_id')->nullable()->index();

            $table->boolean('has_pharmacy')->default(false)->index();

            $table->boolean('has_lab')->default(false)->index();

            $table->boolean('is_active')->default(true)->index();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['account_id', 'is_active'], 'idx_account_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
