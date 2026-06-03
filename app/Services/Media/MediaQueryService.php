<?php

namespace App\Services\Media;

use Illuminate\Database\Eloquent\Model;

class MediaQueryService
{
    public function getPrimary(Model $model, string $usageType)
    {
        return $model->media()
            ->where('usage_type', $usageType)
            ->where('is_primary', true)
            ->first();
    }
    public function getFirst(Model $model, string $usageType)
    {
        return $model->media()
            ->where('usage_type', $usageType)
            ->first();
    }
    public function getAll(Model $model, ?string $usageType = null)
    {
        return $model->media()
            ->when($usageType, fn($q) => $q->where('usage_type', $usageType))
            ->orderBy('sort_order')
            ->latest()
            ->get();
    }
}