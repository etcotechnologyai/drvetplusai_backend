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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            
            $table->string('file_path');
            $table->enum('file_type', ['image', 'video', 'document'])
                ->default('image')
                ->index();

            $table->string('disk', 50)->default('public')->index();

            $table->string('usage_type', 50)->index();

            $table->morphs('mediable');

            $table->boolean('is_primary')->default(false)->index();
            $table->unsignedInteger('sort_order')->default(0);

            $table->string('mime_type', 100)->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->string('alt_text')->nullable();

            $table->timestamps();

            $table->index(['mediable_type', 'mediable_id', 'usage_type'], 'idx_media_lookup');
            $table->index(['mediable_type', 'mediable_id', 'usage_type', 'is_primary'], 'idx_primary_media');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
