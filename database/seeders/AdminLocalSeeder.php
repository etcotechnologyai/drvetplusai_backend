<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminLocalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@drvet.local'],
            [
                'full_name' => 'مدير النظام المحلي',
                'phone' => '+966500000001',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'status' => 1, // Active
            ]
        );
    }
}
