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
        Schema::create('provider_assignments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('provider_id')
                ->constrained('provider_profiles')
                ->cascadeOnDelete();

            $table->foreignId('account_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('branch_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('role', 50)
                ->default('provider') 
                ->index();

            $table->boolean('is_active')
                ->default(true)
                ->index();

            $table->timestamp('assigned_at')
                ->useCurrent();

            $table->timestamp('ended_at')
                ->nullable()
                ->index();

            $table->timestamps();

            $table->unique(
                ['provider_id', 'account_id', 'branch_id'],
                'uniq_provider_assignment'
            );

            $table->index(['provider_id', 'is_active'], 'idx_provider_active');
            $table->index(['account_id', 'branch_id'], 'idx_account_branch');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provider_assignments');
    }
};
