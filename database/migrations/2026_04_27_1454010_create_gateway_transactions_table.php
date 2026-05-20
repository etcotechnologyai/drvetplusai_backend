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
        Schema::create('gateway_transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('payment_id')->constrained()->cascadeOnDelete();

            $table->string('gateway_name', 50)->index();

            $table->string('gateway_transaction_uuid', 255)->unique(); 

            $table->string('gateway_payment_intent', 255)->nullable();

            $table->decimal('amount', 10, 2);

            $table->string('currency', 10)->default('SAR');

            $table->string('status', 20)->default('pending')->index()->comment('pending, success, failed, refunded');

            $table->json('raw_response')->nullable();

            $table->timestamps();

            $table->index(['payment_id', 'status'], 'idx_payment_status');
            $table->index(['gateway_name', 'status'], 'idx_gateway_status');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gateway_transactions');
    }
};
