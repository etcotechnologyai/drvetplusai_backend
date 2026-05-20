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
        Schema::create('consultation_call_events', function (Blueprint $table) {
            $table->id();

            $table->foreignId('call_id')->constrained('consultation_calls')->cascadeOnDelete();

            $table->string('event_type', 30)
                ->index()
                ->comment('created, scheduled, rescheduled, joined, left, started, ended, missed, cancelled');

            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('provider_assignment_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->json('metadata')->nullable();

            $table->timestamps();

            $table->index(['call_id', 'event_type'], 'idx_call_event');
            $table->index(['call_id', 'created_at'], 'idx_call_created');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_call_events');
    }
};
