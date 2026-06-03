<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class License extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'licensable_type',
        'licensable_id',

        'type',
        'issuer',
        'number',

        'issued_at',
        'expires_at',

        'is_verified',
        'status',

        'meta',
    ];

    protected $casts = [
        'issued_at' => 'date',
        'expires_at' => 'date',
        'is_verified' => 'boolean',
        'meta' => 'array',
    ];


    public function licensable()
    {
        return $this->morphTo();
    }
    public function isExpired(): bool
    {
        if (!$this->expires_at) {
            return false;
        }

        return now()->gt($this->expires_at);
    }

    public function isActive(): bool
    {
        return $this->status === 'active' && !$this->isExpired();
    }
    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }
}
