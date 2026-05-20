<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Country;
class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            ['name' => 'المملكة العربية السعودية', 'iso_code' => 'SA', 'nationality_name' => 'سعودي'],
            ['name' => 'الإمارات العربية المتحدة', 'iso_code' => 'AE', 'nationality_name' => 'إماراتي'],
            ['name' => 'الكويت', 'iso_code' => 'KW', 'nationality_name' => 'كويتي'],
            ['name' => 'قطر', 'iso_code' => 'QA', 'nationality_name' => 'قطري'],
            ['name' => 'البحرين', 'iso_code' => 'BH', 'nationality_name' => 'بحريني'],
            ['name' => 'سلطنة عمان', 'iso_code' => 'OM', 'nationality_name' => 'عماني'],
            ['name' => 'مصر', 'iso_code' => 'EG', 'nationality_name' => 'مصري'],
            ['name' => 'السودان', 'iso_code' => 'SD', 'nationality_name' => 'سوداني'],
            ['name' => 'الأردن', 'iso_code' => 'JO', 'nationality_name' => 'أردني'],
            ['name' => 'اليمن', 'iso_code' => 'YE', 'nationality_name' => 'يمني'],
            ['name' => 'سوريا', 'iso_code' => 'SY', 'nationality_name' => 'سوري']
        ];

        foreach ($countries as $country) {
            Country::updateOrCreate(
                ['iso_code' => $country['iso_code']],
                $country
            );
        }
    }
}
