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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained();
            $table->foreignId('account_id')->constrained();

            $table->decimal('amount', 10, 2);

            $table->decimal('tax_percentage', 5, 2);
            $table->decimal('tax_amount', 10, 2);

            $table->decimal('total_amount', 10, 2);

            $table->decimal('commission_percentage', 5, 2);
            $table->decimal('commission_amount', 10, 2);

            $table->decimal('provider_amount', 10, 2);

            $table->string('payment_method', 20)->comment('wallet, gateway');

            $table->string('payment_flow', 20)->comment('platform, provider');

            $table->string('gateway_name', 50)->nullable();

            $table->morphs('reference');

            $table->string('status', 20)->default('pending')->index()->comment('pending, paid, failed, refunded');

            $table->timestamps();

            $table->index(['reference_type', 'reference_id'], 'idx_reference');
            $table->index(['user_id', 'created_at'], 'idx_user_created');
            $table->index(['account_id', 'created_at'], 'idx_account_created');
            $table->index('created_at');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
