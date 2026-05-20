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
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained();
            $table->foreignId('pet_id')->constrained();

            $table->foreignId('service_id')->nullable()->constrained('consultation_services')->nullOnDelete();

            $table->foreignId('purchased_package_id')->nullable()->constrained()->nullOnDelete();

            $table->foreignId('payment_id')->constrained();

            $table->foreignId('provider_assignment_id')->nullable()->constrained()->nullOnDelete();

            $table->string('status', 20)
                ->default('pending')
                ->index()
                ->comment('pending, active, completed, cancelled');

            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
