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
        Schema::create('consultation_examinations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('consultation_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('examination_id')
                ->constrained();

            $table->foreignId('assigned_branch_id')
                ->nullable()
                ->constrained('branches')
                ->nullOnDelete();

            $table->foreignId('requested_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('performed_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('status', 30)
                ->default('requested')
                ->index()
                ->comment('requested, in_progress, completed, cancelled, rejected');

            $table->text('result')->nullable();

            $table->foreignId('media_id')
                ->nullable()
                ->constrained('media')
                ->nullOnDelete();

            $table->text('notes')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamp('performed_at')->nullable();

            $table->timestamps();

            $table->unique(
                ['consultation_id', 'examination_id'],
                'uniq_consultation_examination'
            );

            $table->index(
                ['consultation_id', 'status'],
                'idx_consultation_status'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_examinations');
    }
};
