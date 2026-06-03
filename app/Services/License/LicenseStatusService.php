<?php

namespace App\Services\License;

use App\Models\License;

class LicenseLifecycleService
{
    public function activate(
        License $license
    ): License {
        $license->update([
            'status' => 'active',
        ]);

        return $license->fresh();
    }

    public function suspend(
        License $license
    ): License {
        $license->update([
            'status' => 'suspended',
        ]);

        return $license->fresh();
    }

    public function revoke(
        License $license
    ): License {
        $license->update([
            'status' => 'revoked',
        ]);

        return $license->fresh();
    }

    public function expire(
        License $license
    ): License {
        $license->update([
            'status' => 'expired',
        ]);

        return $license->fresh();
    }
}