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
        Schema::create('consultation_messages', function (Blueprint $table) {
            $table->id();

   
            $table->foreignId('consultation_id')->constrained()->cascadeOnDelete();

            $table->foreignId('sender_id')->constrained('users');

            $table->string('message_type', 20)->index()->comment('text, image, video, audio, file, location');

            $table->text('message')->nullable();

            $table->foreignId('media_id')->nullable()->constrained('media')->nullOnDelete();

            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();

            $table->string('status', 20)->default('sent')->index()->comment('sent, delivered, read');

            $table->timestamp('sent_at')->useCurrent();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('read_at')->nullable();

            $table->timestamps();

            $table->index(['consultation_id', 'created_at'], 'idx_consultation_created');
            $table->index(['sender_id', 'created_at'], 'idx_sender_created');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_messages');
    }
};
