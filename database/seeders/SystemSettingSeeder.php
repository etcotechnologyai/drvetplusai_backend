<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SystemSetting;
class SystemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [

            [
                'key' => 'consultation_commission_percentage',
                'value' => '5',
                'type' => 'float',
                'group' => 'finance',
            ],
            [
                'key' => 'package_commission_percentage',
                'value' => '5',
                'type' => 'float',
                'group' => 'finance',
            ],
            [
                'key' => 'vat_percentage',
                'value' => '15',
                'type' => 'float',
                'group' => 'finance',
            ],
            [
                'key' => 'min_payout_amount',
                'value' => '100',
                'type' => 'float',
                'group' => 'finance',
            ],
        ];

        foreach ($settings as $setting) {
            SystemSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
