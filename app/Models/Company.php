<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'account_id',
        'activity_id',

        'name',
        'legal_name',
        'registration_number',

        'has_medical_services',
        'has_pharmacy',
        'has_lab',

        'is_active',
    ];

    protected $casts = [
        'has_medical_services' => 'boolean',
        'has_pharmacy' => 'boolean',
        'has_lab' => 'boolean',
        'is_active' => 'boolean',
    ];
    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }
     public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
    public function licenses()
    {
        return $this->morphMany(License::class, 'licensable');
    }
}
