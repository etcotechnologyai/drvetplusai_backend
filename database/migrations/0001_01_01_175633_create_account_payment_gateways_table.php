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
        Schema::create('account_payment_gateways', function (Blueprint $table) {
            $table->id();

            $table->foreignId('account_id')->constrained()->cascadeOnDelete();

            $table->string('gateway_name', 50);

            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->index();

            $table->boolean('is_default')->default(false)->index();

            $table->string('public_key')->nullable();
            $table->string('secret_key')->nullable();

            $table->json('config')->nullable();

            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamp('reviewed_at')->nullable();
            $table->string('rejection_reason')->nullable();

            $table->timestamps();
            $table->unique(['account_id', 'gateway_name'], 'unique_account_gateway');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_payment_gateways');
    }
};
