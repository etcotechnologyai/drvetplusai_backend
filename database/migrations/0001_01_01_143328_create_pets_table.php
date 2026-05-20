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
        Schema::create('pets', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name', 100);

            $table->foreignId('animal_type_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('breed_id')->nullable()->constrained()->nullOnDelete();
            $table->date('birth_date')->nullable()->index();

            $table->enum('gender', ['male', 'female'])->nullable();

            $table->decimal('weight', 5, 2)->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();
            $table->softDeletes();
            $table->unique(['user_id', 'name', 'deleted_at'], 'uniq_user_pet_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
