<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $roles = [
            ['name' => 'مدير نظام', 'code' => 'admin'],
            ['name' => 'طبيب بيطري', 'code' => 'veterinarian'],
            ['name' => 'موظف', 'code' => 'staff'],
            ['name' => 'عميل', 'code' => 'customer'],
        ];
        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['code' => $role['code']],
                ['name' => $role['name']]
            );
        }
    }
}
