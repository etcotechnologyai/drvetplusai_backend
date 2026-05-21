<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Company;
use App\Models\ProviderProfile;
use App\Models\Account;
use App\Models\License;
use Illuminate\Support\Facades\Hash;

class AdminProviderApprovalTest extends TestCase
{
    use RefreshDatabase;

    protected function createAdmin()
    {
        return User::create([
            'full_name' => 'Admin User',
            'email' => 'admin@drvetplus.com',
            'phone' => '+966500000001',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 1,
        ]);
    }

    protected function createProviderUser($email = 'provider@drvetplus.com')
    {
        $user = User::create([
            'full_name' => 'Provider User',
            'email' => $email,
            'phone' => '+966500000002',
            'password' => Hash::make('password'),
            'role' => 'provider',
            'status' => 0, // Pending
        ]);

        $account = Account::create([
            'name' => 'Clinic Account',
            'type' => 'company',
            'owner_id' => $user->id,
            'is_active' => false,
        ]);

        $activityId = \Illuminate\Support\Facades\DB::table('activities')->insertGetId([
            'code' => 'VET_CLINIC',
            'name' => 'Veterinary Clinic',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $company = Company::create([
            'account_id' => $account->id,
            'activity_id' => $activityId,
            'name' => 'Clinic Company',
            'registration_number' => '1234567890',
            'city' => 'الرياض',
            'is_active' => false,
            'has_medical_services' => true,
            'has_pharmacy' => false,
            'has_lab' => false,
        ]);

        License::create([
            'licensable_id' => $company->id,
            'licensable_type' => Company::class,
            'type' => 'commercial',
            'number' => '1234567890',
            'meta' => json_encode(['file_path' => 'company-documents/test.pdf']),
        ]);

        return $user;
    }

    public function test_admin_can_view_dashboard_stats(): void
    {
        $admin = $this->createAdmin();
        $this->createProviderUser();

        $response = $this->actingAs($admin)
            ->get('/admin/dashboard');

        $response->assertStatus(200);
    }

    public function test_admin_can_view_providers_list(): void
    {
        $admin = $this->createAdmin();
        $this->createProviderUser();

        $response = $this->actingAs($admin)
            ->get('/admin/providers');

        $response->assertStatus(200);
    }

    public function test_admin_can_view_provider_details(): void
    {
        $admin = $this->createAdmin();
        $provider = $this->createProviderUser();

        $response = $this->actingAs($admin)
            ->get("/admin/providers/{$provider->id}");

        $response->assertStatus(200);
    }

    public function test_non_admin_cannot_view_or_actions_providers(): void
    {
        $provider = $this->createProviderUser();
        
        $response = $this->actingAs($provider)
            ->get('/admin/providers');
        
        $response->assertStatus(403);

        $responseApprove = $this->actingAs($provider)
            ->post("/admin/providers/{$provider->id}/approve");

        $responseApprove->assertStatus(403);
    }

    public function test_admin_can_approve_provider(): void
    {
        $admin = $this->createAdmin();
        $provider = $this->createProviderUser();

        $response = $this->actingAs($admin)
            ->post("/admin/providers/{$provider->id}/approve");

        $response->assertRedirect();
        
        $provider->refresh();
        $this->assertEquals(1, $provider->status);
        $this->assertNotNull($provider->approved_at);
        $this->assertNull($provider->rejection_reason);

        // Check account and company are active
        $account = $provider->accounts->first();
        $this->assertTrue((bool)$account->is_active);
        
        $company = Company::where('account_id', $account->id)->first();
        $this->assertTrue((bool)$company->is_active);
    }

    public function test_admin_can_reject_provider_with_reason(): void
    {
        $admin = $this->createAdmin();
        $provider = $this->createProviderUser();

        $response = $this->actingAs($admin)
            ->post("/admin/providers/{$provider->id}/reject", [
                'rejection_reason' => 'الترخيص غير صالح أو منتهي الصلاحية'
            ]);

        $response->assertRedirect();

        $provider->refresh();
        $this->assertEquals(2, $provider->status);
        $this->assertNull($provider->approved_at);
        $this->assertEquals('الترخيص غير صالح أو منتهي الصلاحية', $provider->rejection_reason);

        // Check account and company are inactive
        $account = $provider->accounts->first();
        $this->assertFalse((bool)$account->is_active);

        $company = Company::where('account_id', $account->id)->first();
        $this->assertFalse((bool)$company->is_active);
    }

    public function test_admin_cannot_reject_without_reason(): void
    {
        $admin = $this->createAdmin();
        $provider = $this->createProviderUser();

        $response = $this->actingAs($admin)
            ->post("/admin/providers/{$provider->id}/reject", [
                'rejection_reason' => ''
            ]);

        $response->assertSessionHasErrors(['rejection_reason']);

        $provider->refresh();
        $this->assertEquals(0, $provider->status); // unchanged
    }

    public function test_admin_can_suspend_provider(): void
    {
        $admin = $this->createAdmin();
        $provider = $this->createProviderUser();

        // First approve
        $this->actingAs($admin)->post("/admin/providers/{$provider->id}/approve");

        // Then suspend
        $response = $this->actingAs($admin)
            ->post("/admin/providers/{$provider->id}/suspend");

        $response->assertRedirect();

        $provider->refresh();
        $this->assertEquals(3, $provider->status);

        // Check account and company are deactivated
        $account = $provider->accounts->first();
        $this->assertFalse((bool)$account->is_active);

        $company = Company::where('account_id', $account->id)->first();
        $this->assertFalse((bool)$company->is_active);
    }
}
