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
        Schema::create('account_payout_accounts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('account_id')->constrained()->cascadeOnDelete();

            $table->foreignId('payout_method_id')->constrained();

            $table->string('account_holder_name');

            $table->string('iban', 50)->nullable();
            $table->string('account_number', 50)->nullable();
            $table->string('wallet_number', 50)->nullable();

            $table->boolean('is_default')->default(false)->index();
            $table->boolean('is_verified')->default(false)->index();

            $table->timestamps();

            $table->index(['account_id', 'is_default'], 'idx_default_account');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_payout_accounts');
    }
};
