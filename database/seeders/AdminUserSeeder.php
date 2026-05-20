<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@drvetplus.com'],
            [
                'full_name' => 'مدير النظام',
                'phone' => '+966500000000',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'status' => 1, // Active
            ]
        );
    }
}
