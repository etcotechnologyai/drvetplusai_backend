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
        Schema::create('consultation_calls', function (Blueprint $table) {
            $table->id();

            $table->foreignId('consultation_id')->constrained();

            $table->foreignId('provider_assignment_id')->nullable()->constrained()->nullOnDelete();

            $table->string('type', 20)->index()->comment('voice, video');

            $table->string('provider', 50)->default('livekit')->comment('livekit, agora, twilio');

            $table->string('room_name', 255)->unique();

            $table->string('status', 20)->default('waiting')->index()->comment('scheduled, waiting, started, ended, missed, cancelled');

            $table->timestamp('scheduled_at')->nullable();

            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();

            $table->foreignId('created_by')->constrained('users');

            $table->timestamps();

            $table->index(['consultation_id', 'status'], 'idx_consultation_calls_status');
            $table->index(['provider_assignment_id', 'scheduled_at'], 'idx_provider_schedule');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_calls');
    }
};
