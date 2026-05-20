<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProviderProfile extends Model
{
    protected $guarded = [];

    public function licenses()
    {
        return $this->morphMany(License::class, 'licensable');
    }
}
