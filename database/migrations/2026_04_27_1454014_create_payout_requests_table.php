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
        Schema::create('payout_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('account_id')->constrained();

            $table->foreignId('payout_account_id')->constrained('account_payout_accounts')->index();

            $table->decimal('amount', 10, 2);

            $table->string('status', 20)->default('pending')->index()->comment('pending, approved, paid, rejected');

            $table->string('transaction_reference')->nullable();

            $table->foreignId('proof_media_id')->nullable()->constrained('media')->nullOnDelete();

            $table->text('notes')->nullable();

            $table->foreignId('processed_by')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamp('processed_at')->nullable();

            $table->timestamps();

            $table->index(['account_id', 'status'], 'idx_account_status');

          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payout_requests');
    }
};
