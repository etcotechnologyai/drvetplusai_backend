<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Activity;
class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activities = [

            ['name' => 'عيادة بيطرية', 'code' => 'clinic'],
            ['name' => 'صيدلية بيطرية', 'code' => 'pharmacy'],
            ['name' => 'متجر مستلزمات الحيوانات', 'code' => 'pet_store'],
            ['name' => 'مركز رعاية الحيوانات', 'code' => 'care_center'],
            ['name' => 'مختبر بيطري', 'code' => 'lab'],

        ];

        foreach ($activities as $activity) {
            Activity::updateOrCreate(
                ['code' => $activity['code']],
                ['name' => $activity['name']]
            );
        }
    }
}
