<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $guarded = [];

    public function licenses()
    {
        return $this->morphMany(License::class, 'licensable');
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
