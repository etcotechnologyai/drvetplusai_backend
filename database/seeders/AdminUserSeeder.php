<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Account;
use App\Models\Role;
use App\Models\User;
use App\Models\Membership;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        DB::transaction(function () {
            $adminRole = Role::where('code', 'super_admin')->first();

            $admin = User::firstOrCreate(
                ['phone' => '966500000000'], 
                [
                    'full_name' => 'مدير النظام - دكتور فيت بلس',
                    'email' => 'admin@drvetplus.com',
                    'password' => Hash::make('Admin@123456'),
                    'status' => 1, 
                    'phone_verified_at' => now(),
                ]
            );
            
            $adminAccount = Account::firstOrCreate(
                ['owner_id' => $admin->id, 'type' => 'system_admin'],
                [
                    'name' => 'إدارة دكتور فيت بلس',
                    'is_active' => true,
                ]
            );

           
            if ($adminRole) {
                Membership::firstOrCreate(
                    [
                        'user_id' => $admin->id,
                        'account_id' => $adminAccount->id,
                        'role_id' => $adminRole->id,
                    ],
                    ['is_active' => true]
                );
            }

            $admin = User::firstOrCreate(
                ['phone' => '966500000001'], 
                [
                    'full_name' => 'مدير النظام - دكتور فيت بلس',
                    'email' => 't@t.t',
                    'password' => Hash::make('12345678'),
                    'status' => 1, 
                    'phone_verified_at' => now(),
                ]
            );
            
            $adminAccount = Account::firstOrCreate(
                ['owner_id' => $admin->id, 'type' => 'system_admin'],
                [
                    'name' => 'إدارة دكتور فيت بلس',
                    'is_active' => true,
                ]
            );

           
            if ($adminRole) {
                Membership::firstOrCreate(
                    [
                        'user_id' => $admin->id,
                        'account_id' => $adminAccount->id,
                        'role_id' => $adminRole->id,
                    ],
                    ['is_active' => true]
                );
            }
        });
    }
}
