<?php

namespace App\Services\License;

use App\Models\License;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LicenseService
{
    public function create(
        Model $model,
        array $data
    ): License {
        return DB::transaction(function () use ($model, $data) {

            return $model->licenses()->create([
                'type' => $data['type'],
                'issuer' => $data['issuer'] ?? null,
                'number' => $data['number'],
                'issued_at' => $data['issued_at'] ?? null,
                'expires_at' => $data['expires_at'] ?? null,
                'is_verified' => false,
                'status' => 'active',
                'meta' => $data['meta'] ?? null,
            ]);
        });
    }

    public function update(
        License $license,
        array $data
    ): License {
        $license->update([
            'type' => $data['type'] ?? $license->type,
            'issuer' => $data['issuer'] ?? $license->issuer,
            'number' => $data['number'] ?? $license->number,
            'issued_at' => $data['issued_at'] ?? $license->issued_at,
            'expires_at' => $data['expires_at'] ?? $license->expires_at,
            'meta' => $data['meta'] ?? $license->meta,
        ]);

        return $license->fresh();
    }

    public function verify(
        License $license
    ): License {
        $license->update([
            'is_verified' => true,
        ]);

        return $license->fresh();
    }

    public function unverify(
        License $license
    ): License {
        $license->update([
            'is_verified' => false,
        ]);

        return $license->fresh();
    }

    public function renew(
        License $license,
        string $expiresAt
    ): License {
        $license->update([
            'expires_at' => $expiresAt,
            'status' => 'active',
        ]);

        return $license->fresh();
    }

    public function delete(
        License $license
    ): bool {
        return $license->delete();
    }
}