<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\ProviderProfile;
use App\Models\ProviderAssignment;
use App\Models\Branch;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Country;

class DoctorController extends Controller
{
    private function getClinicAccount()
    {
        $user = auth()->user();
        return $user->accounts()->whereHas('company')->with(['company'])->firstOrFail();
    }

    public function index()
    {
        $account = $this->getClinicAccount();

        $doctors = \DB::table('provider_assignments')
            ->join('provider_profiles', 'provider_assignments.provider_id', '=', 'provider_profiles.id')
            ->join('users', 'provider_profiles.user_id', '=', 'users.id')
            ->leftJoin('branches', 'provider_assignments.branch_id', '=', 'branches.id')
            ->where('provider_assignments.account_id', $account->id)
            ->select([
                'provider_assignments.id as assignment_id',
                'provider_assignments.role as assignment_role',
                'provider_assignments.is_active as is_active',
                'provider_assignments.assigned_at',
                'users.full_name',
                'users.email',
                'users.phone',
                'users.id as user_id',
                'provider_profiles.id as provider_id',
                'provider_profiles.city',
                'provider_profiles.specialty',
                'branches.name as branch_name',
                'branches.id as branch_id',
            ])
            ->orderBy('provider_assignments.created_at', 'desc')
            ->get();

        return Inertia::render('Clinic/Doctors', [
            'doctors' => $doctors,
            'company' => $account->company,
        ]);
    }

    public function create()
    {
        $account = $this->getClinicAccount();
        $branches = Branch::where('account_id', $account->id)->get();
        return Inertia::render('Clinic/Doctors/Create', [
            'company' => $account->company,
            'branches' => $branches
        ]);
    }

    public function store(Request $request)
    {
        $account = $this->getClinicAccount();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20|unique:users,phone',
            'specialty' => 'required|string|max:255',
            'license_number' => 'required|string|max:255',
            'branch_id' => 'required|exists:branches,id',
            'status' => 'required|in:active,inactive',
        ]);

        $user = User::create([
            'full_name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make(Str::random(10)), // Generate a random password by default
            'role' => 'doctor',
            'status' => 1 // Active
        ]);

        $country = Country::first() ?? Country::create(['name' => 'SA', 'code' => 'SA']);

        $profile = ProviderProfile::create([
            'user_id' => $user->id,
            'national_id' => 'NA-' . Str::random(5), // Placeholder
            'nationality_id' => $country->id,
            'city' => '',
            'specialty' => $validated['specialty'],
        ]);

        ProviderAssignment::create([
            'provider_id' => $profile->id,
            'account_id' => $account->id,
            'branch_id' => $validated['branch_id'],
            'role' => 'doctor',
            'is_active' => $validated['status'] === 'active',
        ]);

        // Just putting specialty and license generally if needed we could insert to separate tables
        // But the primary objective is to make them display as 'real' or linked properly.

        return redirect()->route('clinic.doctors')->with('success', 'تم إضافة الطبيب بنجاح');
    }
}
