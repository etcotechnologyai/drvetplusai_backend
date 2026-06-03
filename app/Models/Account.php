<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Account extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'owner_id',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
    public function company()
    {
        return $this->hasOne(
            Company::class,
            'account_id',
            'id'
        );
    }
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }

    public function users()
    {
        return $this->belongsToMany(
            User::class,
            'memberships',
            'account_id',
            'user_id'
        )->withPivot([
                    'role_id',
                    'is_active',
                ])->withTimestamps();
    }
}
