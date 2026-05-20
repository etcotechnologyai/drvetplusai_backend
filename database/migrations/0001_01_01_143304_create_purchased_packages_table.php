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
        Schema::create('purchased_packages', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained();

            $table->foreignId('package_id')
                ->constrained('consultation_packages');

            $table->string('title');

            $table->unsignedInteger('total_consultations');
            $table->unsignedInteger('remaining_consultations');

            $table->decimal('price', 10, 2);

            $table->foreignId('payment_id')->constrained()->cascadeOnDelete();

            $table->string('status', 20)->default('active')->index()->comment('active, completed, expired');

            $table->timestamps();

            $table->index(['user_id', 'status'], 'idx_user_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchased_packages');
    }
};
