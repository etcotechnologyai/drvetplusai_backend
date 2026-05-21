<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Schema;

class ClinicDashboardController extends Controller
{
    /**
     * Get the clinic account for the current user.
     */
    private function getClinicContext(Request $request)
    {
        $user = auth()->user();
        $account = $user->accounts()->whereHas('company')->with(['company'])->first();

        if (!$account) {
            abort(403, 'لا توجد منشأة مرتبطة بحسابك.');
        }

        return [
            'user' => $user,
            'account' => $account,
            'company' => $account->company,
        ];
    }

    /**
     * Clinic Dashboard - main overview.
     */
    public function index(Request $request)
    {
        $ctx = $this->getClinicContext($request);
        $company = $ctx['company'];
        $account = $ctx['account'];

        // 1. KPI: Branches
        $branchesCount = \App\Models\Branch::where('account_id', $account->id)->count();

        // 2. KPI: Available Doctors
        $doctorsCount = 0;
        $doctorsList = [];
        if (Schema::hasTable('provider_assignments')) {
            $doctorsList = \DB::table('provider_assignments')
                ->join('provider_profiles', 'provider_assignments.provider_id', '=', 'provider_profiles.id')
                ->join('users', 'provider_profiles.user_id', '=', 'users.id')
                ->where('provider_assignments.account_id', $account->id)
                ->where('provider_assignments.is_active', true)
                ->select([
                    'provider_assignments.id',
                    'users.full_name',
                    'users.phone',
                    'provider_assignments.is_active'
                ])->get();

            $doctorsCount = $doctorsList->count();
        }

        // 3. KPI / List: Active Consultations
        $activeConsultations = [];
        $consultationsCount = 0;
        if (Schema::hasTable('consultations') && Schema::hasTable('provider_assignments')) {
            $assignmentIds = \DB::table('provider_assignments')
                ->where('account_id', $account->id)
                ->pluck('id');
            if ($assignmentIds->isNotEmpty()) {
                $consultationsQuery = \DB::table('consultations')
                    ->whereIn('provider_assignment_id', $assignmentIds)
                    ->join('users', 'consultations.user_id', '=', 'users.id')
                    ->join('pets', 'consultations.pet_id', '=', 'pets.id')
                    ->leftJoin('consultation_services', 'consultations.service_id', '=', 'consultation_services.id')
                    ->leftJoin('provider_assignments', 'consultations.provider_assignment_id', '=', 'provider_assignments.id')
                    ->leftJoin('provider_profiles', 'provider_assignments.provider_id', '=', 'provider_profiles.id')
                    ->leftJoin('users as doctors', 'provider_profiles.user_id', '=', 'doctors.id')
                    ->whereIn('consultations.status', ['active', 'pending']);

                $consultationsCount = $consultationsQuery->count();

                $activeConsultations = $consultationsQuery
                    ->select([
                        'consultations.id',
                        'consultations.status',
                        'consultations.created_at',
                        'users.full_name as client_name',
                        'pets.name as pet_name',
                        'consultation_services.name as service_name',
                        'doctors.full_name as doctor_name',
                    ])
                    ->orderBy('consultations.created_at', 'desc')
                    ->limit(5)
                    ->get()
                    ->toArray();
            }
        }

        // 4. Appointments
        $todaysAppointments = [];
        $appointmentsCount = 0;
        if (Schema::hasTable('appointments')) {
            $appointmentsCount = \DB::table('appointments')->where('account_id', $account->id)->count();

            $todaysAppointments = \DB::table('appointments')
                ->where('appointments.account_id', $account->id)
                ->whereDate('appointments.date', today())
                ->join('users', 'appointments.user_id', '=', 'users.id')
                ->leftJoin('pets', 'appointments.pet_id', '=', 'pets.id')
                ->leftJoin('branches', 'appointments.branch_id', '=', 'branches.id')
                ->leftJoin('provider_assignments', 'appointments.provider_assignment_id', '=', 'provider_assignments.id')
                ->leftJoin('provider_profiles', 'provider_assignments.provider_id', '=', 'provider_profiles.id')
                ->leftJoin('users as doctors', 'provider_profiles.user_id', '=', 'doctors.id')
                ->select([
                    'appointments.id',
                    'appointments.time',
                    'appointments.type',
                    'appointments.status',
                    'users.full_name as client_name',
                    'pets.name as pet_name',
                    'branches.name as branch_name',
                    'doctors.full_name as doctor_name',
                ])
                ->orderBy('appointments.time', 'asc')
                ->get()
                ->toArray();
        }

        // 5. Today's Revenue
        $todayRevenue = 0;
        if (Schema::hasTable('payments')) {
            $todayRevenue = \DB::table('payments')
                ->where('account_id', $account->id)
                ->where('status', 'paid')
                ->whereDate('created_at', today())
                ->sum('provider_amount');
        }

        // 6. Expiring Licenses
        $expiringLicenses = [];
        if (Schema::hasTable('licenses')) {
            $expiringLicenses = \App\Models\License::where('licensable_id', $company->id)
                ->where('licensable_type', \App\Models\Company::class)
                ->whereNotNull('expires_at')
                ->where('expires_at', '<', now()->addDays(30))
                ->get()
                ->map(fn($l) => [
                    'id' => $l->id,
                    'type' => $l->type,
                    'number' => $l->number,
                    'expires_at' => $l->expires_at,
                    'days_left' => round(now()->diffInDays($l->expires_at, false))
                ]);
        }

        // 7. Pending Requests (example: provider requests needing branch assignment)
        $pendingRequestsCount = 0; // Placeholder

        return Inertia::render('Clinic/Dashboard', [
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'legal_name' => $company->legal_name,
                'registration_number' => $company->registration_number,
                'is_active' => (bool) $company->is_active,
                'has_medical_services' => (bool) $company->has_medical_services,
                'has_pharmacy' => (bool) $company->has_pharmacy,
                'has_lab' => (bool) $company->has_lab,
            ],
            'stats' => [
                'branches' => $branchesCount,
                'doctors' => $doctorsCount,
                'appointments' => $appointmentsCount,
                'consultations' => $consultationsCount,
                'revenue' => $todayRevenue,
                'pendingRequests' => $pendingRequestsCount,
            ],
            'activeConsultations' => $activeConsultations,
            'todaysAppointments' => $todaysAppointments,
            'doctorsStatus' => $doctorsList,
            'alerts' => [
                'expiringLicenses' => $expiringLicenses,
                'pendingLabResults' => [], // Placeholder
                'incompletePrescriptions' => [], // Placeholder
            ],
            'approvalStatus' => (int) auth()->user()->status === 1 ? 'approved' : 'pending',
        ]);
    }

    /**
     * Clinic Profile page.
     */
    public function profile(Request $request)
    {
        $ctx = $this->getClinicContext($request);
        $company = $ctx['company'];
        $account = $ctx['account'];

        // Get licenses
        $licenses = $company->licenses()->get()->map(function ($l) {
            return [
                'id' => $l->id,
                'type' => $l->type,
                'number' => $l->number,
                'issued_at' => $l->issued_at,
                'expires_at' => $l->expires_at,
                'status' => $l->status ?? 'active',
            ];
        });

        return Inertia::render('Clinic/Profile', [
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'legal_name' => $company->legal_name,
                'registration_number' => $company->registration_number,
                'is_active' => (bool) $company->is_active,
                'has_medical_services' => (bool) $company->has_medical_services,
                'has_pharmacy' => (bool) $company->has_pharmacy,
                'has_lab' => (bool) $company->has_lab,
                'created_at' => $company->created_at,
            ],
            'account' => [
                'id' => $account->id,
                'name' => $account->name,
                'type' => $account->type,
                'is_active' => (bool) $account->is_active,
            ],
            'licenses' => $licenses,
            'owner' => [
                'full_name' => auth()->user()->full_name,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->phone,
            ],
        ]);
    }

    /**
     * Branches list page.
     */
    public function branches(Request $request)
    {
        $ctx = $this->getClinicContext($request);
        $account = $ctx['account'];

        $branches = \App\Models\Branch::where('account_id', $account->id)
            ->orderBy('is_main', 'desc')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($b) {
                return [
                    'id' => $b->id,
                    'name' => $b->name,
                    'is_main' => (bool) $b->is_main,
                    'has_pharmacy' => (bool) $b->has_pharmacy,
                    'has_lab' => (bool) $b->has_lab,
                    'is_active' => (bool) $b->is_active,
                    'created_at' => $b->created_at,
                ];
            });

        return Inertia::render('Clinic/Branches', [
            'branches' => $branches,
            'company' => [
                'id' => $ctx['company']->id,
                'name' => $ctx['company']->name,
            ],
        ]);
    }

    /**
     * Doctors list page.
     */
    public function doctors(Request $request)
    {
        $ctx = $this->getClinicContext($request);
        $account = $ctx['account'];

        $doctors = [];
        if (Schema::hasTable('provider_assignments')) {
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
                    'provider_profiles.id as provider_id',
                    'provider_profiles.city',
                    'branches.name as branch_name',
                    'branches.id as branch_id',
                ])
                ->orderBy('provider_assignments.created_at', 'desc')
                ->get()
                ->toArray();
        }

        return Inertia::render('Clinic/Doctors', [
            'doctors' => $doctors,
            'company' => [
                'id' => $ctx['company']->id,
                'name' => $ctx['company']->name,
            ],
        ]);
    }
    /**
     * Appointments list page.
     */
    public function appointments(Request $request)
    {
        $ctx = $this->getClinicContext($request);
        return Inertia::render('Clinic/Appointments', [
            'company' => $ctx['company'],
        ]);
    }

    /**
     * Consultations list page.
     */
    public function consultations(Request $request)
    {
        $ctx = $this->getClinicContext($request);
        return Inertia::render('Clinic/Consultations', [
            'company' => $ctx['company'],
        ]);
    }

    /**
     * Clinic Settings page.
     */
    public function settings(Request $request)
    {
        $ctx = $this->getClinicContext($request);
        return Inertia::render('Clinic/Settings', [
            'company' => $ctx['company'],
        ]);
    }
}
