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
        Schema::create('payout_methods', function (Blueprint $table) {
            $table->id();

            $table->foreignId('country_id')->constrained()->cascadeOnDelete();

            $table->string('name_ar', 150);
            $table->string('name_en', 150);

            $table->string('type', 20)->index()->comment('bank, wallet');

            $table->string('code', 50);

            $table->boolean('is_active')->default(true)->index();

            $table->timestamps();

            $table->unique(['country_id', 'code'], 'uniq_country_method');
            $table->index(['country_id', 'is_active'], 'idx_country_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payout_methods');
    }
};
