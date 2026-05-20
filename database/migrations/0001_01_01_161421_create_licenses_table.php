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
        Schema::create('licenses', function (Blueprint $table) {
            $table->id();
            $table->morphs('licensable');
            $table->string('type', 50)
                ->index()
                ->comment('License type: commercial, medical, pharmacy, lab, professional');

            $table->string('issuer', 100)
                ->nullable()
                ->index()
                ->comment('Issuer authority: MOH, SFDA, MOC, Municipality, SCFHS');

            $table->string('number', 100)->index();

            $table->date('issued_at')->nullable();

            $table->date('expires_at')->nullable()->index();
            $table->boolean('is_verified')->default(false)->index();

            $table->enum('status', ['active', 'expired', 'suspended', 'revoked'])->default('active')->index();

            $table->json('meta')->nullable();

            $table->timestamps();
            $table->softDeletes();
            $table->index(['licensable_type', 'licensable_id', 'type'], 'idx_licensable_type');
            $table->index(['expires_at', 'status'], 'idx_expiry_status');


            $table->unique(['issuer', 'type', 'number'], 'uniq_license_full');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licenses');
    }
};
