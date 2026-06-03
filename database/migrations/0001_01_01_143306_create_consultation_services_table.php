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
        Schema::create('consultation_services', function (Blueprint $table) {
            $table->id();

            $table->foreignId('account_id')->constrained()->cascadeOnDelete();

            $table->string('title');
            $table->text('description');

            $table->decimal('price', 10, 2);

            $table->foreignId('consultation_type_id')->constrained();

            $table->foreignId('provider_assignment_id')->nullable()->constrained()->nullOnDelete();

            $table->boolean('show_provider')->default(false);
            $table->boolean('is_active')->default(true)->index();
             
            $table->timestamps();
            $table->index(['account_id', 'is_active'], 'idx_account_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_services');
    }
};
