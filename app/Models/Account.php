<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $guarded = [];

    public function company()
    {
        return $this->hasOne(Company::class);
    }

    public function branches()
    {
        return $this->hasMany(Branch::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
