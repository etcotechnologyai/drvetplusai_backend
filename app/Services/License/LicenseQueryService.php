<?php

namespace App\Services\License;

use App\Models\License;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class LicenseQueryService
{
    public function find(
        int $id
    ): ?License {
        return License::find($id);
    }

    public function findByNumber(
        string $number
    ): ?License {
        return License::where('number', $number)->first();
    }

    public function getAll(): Collection
    {
        return License::latest()->get();
    }

    public function getVerified(): Collection
    {
        return License::where('is_verified', true)
            ->latest()
            ->get();
    }

    public function getActive(): Collection
    {
        return License::where('status', 'active')
            ->latest()
            ->get();
    }

    public function getExpired(): Collection
    {
        return License::whereDate(
            'expires_at',
            '<',
            now()
        )
            ->latest()
            ->get();
    }

    public function getExpiringSoon(
        int $days = 30
    ): Collection {
        return License::whereDate(
            'expires_at',
            '<=',
            now()->addDays($days)
        )
            ->where('status', 'active')
            ->latest()
            ->get();
    }

    public function getForModel(
        Model $model
    ): Collection {
        return $model->licenses()
            ->latest()
            ->get();
    }

    public function getByType(
        string $type
    ): Collection {
        return License::where('type', $type)
            ->latest()
            ->get();
    }

    public function getByIssuer(
        string $issuer
    ): Collection {
        return License::where('issuer', $issuer)
            ->latest()
            ->get();
    }
}