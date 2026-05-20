<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Company;
use App\Models\ProviderProfile;
use App\Models\Pet;
use App\Models\Consultation;
use App\Models\Payment;
use App\Models\ConsultationPackage;
use App\Models\SystemSetting;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // 1. Gather all platform statistics
        $stats = [
            'total_users' => User::count(),
            'total_providers' => User::where('role', 'provider')->count(),
            'total_companies' => Company::count(),
            'pending_approvals' => User::where('role', 'provider')->where('status', 0)->count(),
            'total_doctors' => ProviderProfile::count(),
            'total_pets' => Pet::count(),
            'total_consultations' => Consultation::count(),
            'total_payments' => Payment::count(),
        ];

        // 2. Fetch pending provider registration requests
        $recent_providers = User::where('role', 'provider')
            ->where('status', 0)
            ->with(['providerProfile', 'accounts.company'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($u) {
                $type = 'doctor';
                $entityName = 'طبيب بيطري';
                $city = $u->providerProfile?->city;
                
                $account = $u->accounts->first();
                if ($account && $account->company) {
                    $type = 'clinic';
                    $entityName = $account->company->name;
                    $city = $account->company->city;
                }
                
                return [
                    'id' => $u->id,
                    'full_name' => $u->full_name,
                    'email' => $u->email,
                    'phone' => $u->phone,
                    'type' => $type,
                    'entity_name' => $entityName,
                    'city' => $city,
                    'created_at' => $u->created_at->format('Y-m-d H:i'),
                ];
            });

        // 3. Fetch recent registered users (excluding admins)
        $recent_users = User::where('role', '!=', 'admin')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($u) {
                return [
                    'id' => $u->id,
                    'full_name' => $u->full_name,
                    'email' => $u->email,
                    'role' => $u->role,
                    'status' => $u->status,
                    'created_at' => $u->created_at->format('Y-m-d H:i'),
                ];
            });

        // 4. Fetch recent registered companies with owner relations
        $recent_companies = Company::with(['account'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($c) {
                return [
                    'id' => $c->id,
                    'name' => $c->name,
                    'registration_number' => $c->registration_number,
                    'city' => $c->city,
                    'is_active' => (bool)$c->is_active,
                    'owner_id' => $c->account?->owner_id,
                    'created_at' => $c->created_at ? $c->created_at->format('Y-m-d H:i') : null,
                ];
            });

        // 5. Build dynamic system alerts
        $alerts = [];
        if ($stats['pending_approvals'] > 0) {
            $alerts[] = [
                'type' => 'warning',
                'message' => "يوجد عدد ({$stats['pending_approvals']}) طلب اعتماد معلق بحاجة للمراجعة واتخاذ قرار.",
                'date' => now()->format('Y-m-d H:i')
            ];
        } else {
            $alerts[] = [
                'type' => 'info',
                'message' => "لا توجد طلبات اعتماد معلقة جديدة حالياً. النظام مستقر.",
                'date' => now()->format('Y-m-d H:i')
            ];
        }

        $inactive_companies = Company::where('is_active', false)->count();
        if ($inactive_companies > 0) {
            $alerts[] = [
                'type' => 'info',
                'message' => "يوجد عدد ({$inactive_companies}) منشآت مسجلة غير نشطة بانتظار التنشيط.",
                'date' => now()->format('Y-m-d H:i')
            ];
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_providers' => $recent_providers,
            'recent_users' => $recent_users,
            'recent_companies' => $recent_companies,
            'alerts' => $alerts
        ]);
    }

    public function companies()
    {
        $companies = Company::with(['account.owner'])->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->name,
                'registration_number' => $c->registration_number,
                'city' => $c->city,
                'is_active' => (bool)$c->is_active,
                'owner_name' => $c->account?->owner?->full_name ?? 'غير متوفر',
                'owner_email' => $c->account?->owner?->email ?? 'غير متوفر',
                'created_at' => $c->created_at ? $c->created_at->format('Y-m-d H:i') : null,
            ];
        });

        return Inertia::render('Admin/Companies/Index', [
            'companies' => $companies
        ]);
    }

    public function doctors()
    {
        $doctors = ProviderProfile::with('user')->get()->map(function ($d) {
            return [
                'id' => $d->id,
                'full_name' => $d->user?->full_name ?? 'غير متوفر',
                'email' => $d->user?->email ?? 'غير متوفر',
                'phone' => $d->user?->phone ?? 'غير متوفر',
                'city' => $d->city,
                'is_active' => (bool)$d->is_active,
                'created_at' => $d->created_at ? $d->created_at->format('Y-m-d H:i') : null,
            ];
        });

        return Inertia::render('Admin/Doctors/Index', [
            'doctors' => $doctors
        ]);
    }

    public function petOwners()
    {
        $owners = User::where('role', 'pet_owner')->get()->map(function ($o) {
            return [
                'id' => $o->id,
                'full_name' => $o->full_name,
                'email' => $o->email,
                'phone' => $o->phone,
                'status' => $o->status,
                'created_at' => $o->created_at->format('Y-m-d H:i'),
            ];
        });

        return Inertia::render('Admin/PetOwners/Index', [
            'owners' => $owners
        ]);
    }

    public function pets()
    {
        $pets = Pet::with('user')->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
                'owner_name' => $p->user?->full_name ?? 'غير متوفر',
                'owner_email' => $p->user?->email ?? 'غير متوفر',
                'breed' => $p->breed,
                'age' => $p->age,
                'created_at' => $p->created_at ? $p->created_at->format('Y-m-d H:i') : null,
            ];
        });

        return Inertia::render('Admin/Pets/Index', [
            'pets' => $pets
        ]);
    }

    public function consultations()
    {
        $consultations = Consultation::with(['user', 'pet'])->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'owner_name' => $c->user?->full_name ?? 'غير متوفر',
                'pet_name' => $c->pet?->name ?? 'غير متوفر',
                'status' => $c->status,
                'started_at' => $c->started_at ? $c->started_at->format('Y-m-d H:i') : null,
                'created_at' => $c->created_at ? $c->created_at->format('Y-m-d H:i') : null,
            ];
        });

        return Inertia::render('Admin/Consultations/Index', [
            'consultations' => $consultations
        ]);
    }

    public function appointments()
    {
        // No Appointment model, mock list as requested
        $appointments = [];

        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => $appointments
        ]);
    }

    public function payments()
    {
        $payments = Payment::get()->map(function ($pay) {
            return [
                'id' => $pay->id,
                'amount' => $pay->amount,
                'status' => $pay->status,
                'method' => $pay->method,
                'reference' => $pay->reference,
                'created_at' => $pay->created_at ? $pay->created_at->format('Y-m-d H:i') : null,
            ];
        });

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments
        ]);
    }

    public function plans()
    {
        $plans = ConsultationPackage::get()->map(function ($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
                'description' => $p->description,
                'price' => $p->price,
                'consultations_count' => $p->consultations_count,
                'validity_days' => $p->validity_days,
                'created_at' => $p->created_at ? $p->created_at->format('Y-m-d H:i') : null,
            ];
        });

        return Inertia::render('Admin/Plans/Index', [
            'plans' => $plans
        ]);
    }

    public function reports()
    {
        return Inertia::render('Admin/Reports/Index');
    }

    public function settings()
    {
        $settings = SystemSetting::get()->map(function ($s) {
            return [
                'id' => $s->id,
                'key' => $s->key,
                'value' => $s->value,
                'group' => $s->group,
            ];
        });

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings
        ]);
    }
}
