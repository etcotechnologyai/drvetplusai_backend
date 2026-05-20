<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Country;
use App\Models\PayoutMethod;
class SaudiPayoutMethodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countryId = Country::where('code', 'SA')->value('id');

        $methods = [

            // Banks - Saudi Arabia
            [
                'name_ar' => 'البنك الأهلي السعودي',
                'name_en' => 'Saudi National Bank (SNB)',
                'code' => 'snb',
                'type' => 'bank'
            ],
            [
                'name_ar' => 'مصرف الراجحي',
                'name_en' => 'Al Rajhi Bank',
                'code' => 'alrajhi',
                'type' => 'bank'
            ],
            [
                'name_ar' => 'بنك الرياض',
                'name_en' => 'Riyad Bank',
                'code' => 'riyad',
                'type' => 'bank'
            ],
            [
                'name_ar' => 'البنك السعودي البريطاني',
                'name_en' => 'Saudi British Bank (SABB)',
                'code' => 'sabb',
                'type' => 'bank'
            ],
            [
                'name_ar' => 'البنك السعودي الفرنسي',
                'name_en' => 'Banque Saudi Fransi (BSF)',
                'code' => 'bsf',
                'type' => 'bank'
            ],
            [
                'name_ar' => 'البنك العربي الوطني',
                'name_en' => 'Arab National Bank (ANB)',
                'code' => 'anb',
                'type' => 'bank'
            ],
            [
                'name_ar' => 'مصرف الإنماء',
                'name_en' => 'Alinma Bank',
                'code' => 'alinma',
                'type' => 'bank'
            ],
            [
                'name_ar' => 'بنك الجزيرة',
                'name_en' => 'Bank AlJazira',
                'code' => 'aljazira',
                'type' => 'bank'
            ],
            [
                'name_ar' => 'البنك السعودي للاستثمار',
                'name_en' => 'Saudi Investment Bank (SAIB)',
                'code' => 'saib',
                'type' => 'bank'
            ],
            [
                'name_ar' => 'بنك البلاد',
                'name_en' => 'Bank Albilad',
                'code' => 'albilad',
                'type' => 'bank'
            ],

            // Wallets
            [
                'name_ar' => 'محفظة STC Pay',
                'name_en' => 'STC Pay',
                'code' => 'stcpay',
                'type' => 'wallet'
            ],
            [
                'name_ar' => 'محفظة urpay',
                'name_en' => 'urpay',
                'code' => 'urpay',
                'type' => 'wallet'
            ],
            [
                'name_ar' => 'محفظة موبايلي باي',
                'name_en' => 'Mobily Pay',
                'code' => 'mobilypay',
                'type' => 'wallet'
            ],
        ];

        foreach ($methods as $method) {
            PayoutMethod::updateOrCreate(
                [
                    'country_id' => $countryId,
                    'code' => $method['code'],
                ],
                [
                    'name_ar' => $method['name_ar'],
                    'name_en' => $method['name_en'],
                    'type' => $method['type'],
                    'is_active' => true,
                ]
            );
        }
    }
}
