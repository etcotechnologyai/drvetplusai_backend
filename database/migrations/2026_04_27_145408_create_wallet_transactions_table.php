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
        Schema::create('wallet_transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('wallet_id')->constrained()->cascadeOnDelete();

            $table->decimal('amount', 14, 2);

            $table->enum('entry_type', ['credit', 'debit']);

            $table->string('type', 50)->index()->comment('payment, earning, commission, refund, withdrawal');

            $table->nullableMorphs('reference');

            $table->string('description')->nullable();

            $table->timestamps();

            $table->index(['wallet_id', 'created_at'], 'idx_wallet_created');
            $table->index(['reference_type', 'reference_id'], 'idx_wallet_reference');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallet_transactions');
    }
};
