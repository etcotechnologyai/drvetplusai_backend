<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'full_name',
        'phone',
        'email',
        'password',
        'status',
        'phone_verified_at',
        'email_verified_at',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'phone_verified_at' => 'datetime',
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
    ];
    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }
    public function accounts()
    {
        return $this->belongsToMany(
            Account::class,
            'memberships',
            'user_id',
            'account_id'
        )->withPivot(['role_id', 'is_active',])->withTimestamps();
    }
    public function providerProfile()
    {
        return $this->hasOne(ProviderProfile::class, 'user_id');
    }
}
