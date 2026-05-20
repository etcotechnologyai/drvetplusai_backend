<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ConsultationType;
class ConsultationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [

            ['name' => 'استشارة طبية', 'code' => 'medical', 'is_medical' => true],
            ['name' => 'استشارة رعاية', 'code' => 'care', 'is_medical' => false],
            ['name' => 'استشارة تغذية', 'code' => 'nutrition', 'is_medical' => false],
            ['name' => 'استشارة سلوكية', 'code' => 'behavior', 'is_medical' => false],
        ];

        foreach ($types as $type) {
            ConsultationType::updateOrCreate(
                ['code' => $type['code']],
                $type
            );
        }
    }
}
