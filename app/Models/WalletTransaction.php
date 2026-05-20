<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalletTransaction extends Model
{
    const TYPE_PAYMENT = 'payment';
    const TYPE_EARNING = 'earning';
    const TYPE_COMMISSION = 'commission';
    const TYPE_REFUND = 'refund';
    const TYPE_WITHDRAWAL = 'withdrawal';
    
}
