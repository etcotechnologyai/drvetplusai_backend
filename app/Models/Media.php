<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $table = 'media';

    protected $fillable = [
        'file_path',
        'file_type',
        'disk',
        'usage_type',
        'mediable_type',
        'mediable_id',
        'is_primary',
        'sort_order',
        'mime_type',
        'file_size',
        'alt_text',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'file_size' => 'integer',
        'sort_order' => 'integer',
    ];

    public function mediable()
    {
        return $this->morphTo();
    }
}
