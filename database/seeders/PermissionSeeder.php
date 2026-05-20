<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;
class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [

            /*
            |---------
            | Branch
            |---------
            */
            ['name' => 'Create Branch', 'code' => 'branch.create'],
            ['name' => 'Update Branch', 'code' => 'branch.update'],
            ['name' => 'Delete Branch', 'code' => 'branch.delete'],
            ['name' => 'View Branch', 'code' => 'branch.view'],

            /*
            |---------
            | Provider
            |---------
            */
            ['name' => 'Create Provider', 'code' => 'provider.create'],
            ['name' => 'Update Provider', 'code' => 'provider.update'],
            ['name' => 'Delete Provider', 'code' => 'provider.delete'],
            ['name' => 'View Provider', 'code' => 'provider.view'],

            /*
            |---------
            | Consultation
            |---------
            */
            ['name' => 'Create Consultation', 'code' => 'consultation.create'],
            ['name' => 'Update Consultation', 'code' => 'consultation.update'],
            ['name' => 'Delete Consultation', 'code' => 'consultation.delete'],
            ['name' => 'View Consultation', 'code' => 'consultation.view'],

            /*
            |---------
            | Company
            |---------
            */
            ['name' => 'Create Company', 'code' => 'company.create'],
            ['name' => 'Update Company', 'code' => 'company.update'],
            ['name' => 'Delete Company', 'code' => 'company.delete'],
            ['name' => 'View Company', 'code' => 'company.view'],

            /*
            |---------
            | Account
            |---------
            */
            ['name' => 'View Account', 'code' => 'account.view'],
            ['name' => 'Update Account', 'code' => 'account.update'],

            /*
            |---------
            | Membership 
            |---------
            */
            ['name' => 'Add Member', 'code' => 'membership.create'],
            ['name' => 'Update Member', 'code' => 'membership.update'],
            ['name' => 'Remove Member', 'code' => 'membership.delete'],
            ['name' => 'View Members', 'code' => 'membership.view'],

            /*
            |---------
            | Roles & Permissions (Management)
            |---------
            */
            ['name' => 'View Roles', 'code' => 'role.view'],
            ['name' => 'Manage Roles', 'code' => 'role.manage'],
            ['name' => 'Assign Permissions', 'code' => 'permission.assign'],

            /*
            |---------
            | Provider Assignments
            |---------
            */
            ['name' => 'Assign Provider', 'code' => 'provider.assign'],
            ['name' => 'Update Assignment', 'code' => 'provider.update'],
            ['name' => 'Remove Assignment', 'code' => 'provider.remove'],
            ['name' => 'View Assignments', 'code' => 'provider.view'],

            /*
            |--
            | Payments 
            |--
            */
            ['name' => 'View Payments', 'code' => 'payment.view'],
            ['name' => 'Create Payment', 'code' => 'payment.create'],
            ['name' => 'Refund Payment', 'code' => 'payment.refund'],

            /*
            |--
            | Wallet
            |---
            */
            ['name' => 'View Wallet', 'code' => 'wallet.view'],
            ['name' => 'Manage Wallet', 'code' => 'wallet.manage'],

            /*
            |
            | Payouts
            |
            */
            ['name' => 'Request Payout', 'code' => 'payout.request'],
            ['name' => 'Approve Payout', 'code' => 'payout.approve'],
            ['name' => 'View Payouts', 'code' => 'payout.view'],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['code' => $permission['code']],
                ['name' => $permission['name']]
            );
        }
    }
}
