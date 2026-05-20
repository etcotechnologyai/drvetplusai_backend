<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Company;
use App\Models\Account;
use App\Models\License;
use Illuminate\Support\Facades\DB;
use App\Models\ProviderProfile;

class AdminProviderController extends Controller
{
    /**
     * Display a listing of all provider registration requests.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status'); // 'pending' (0), 'active' (1), 'rejected' (2)

        $query = User::where('role', 'provider')
            ->with(['providerProfile', 'accounts.company']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhereHas('accounts.company', function ($cq) use ($search) {
                      $cq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($status !== null && $status !== '') {
            if ($status === 'pending') {
                $query->where('status', 0);
            } elseif ($status === 'active') {
                $query->where('status', 1);
            } elseif ($status === 'rejected') {
                $query->where('status', 2);
            }
        }

        $paginator = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        $providers = collect($paginator->items())->map(function ($u) {
            $type = 'doctor';
            $entityName = 'طبيب بيطري مستقل';
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
                'status' => (int) $u->status,
                'created_at' => $u->created_at->format('Y-m-d H:i'),
            ];
        });

        $counts = [
            'all' => User::where('role', 'provider')->count(),
            'pending' => User::where('role', 'provider')->where('status', 0)->count(),
            'active' => User::where('role', 'provider')->where('status', 1)->count(),
            'rejected' => User::where('role', 'provider')->where('status', 2)->count(),
        ];

        return Inertia::render('Admin/Providers/Index', [
            'providers' => [
                'data' => $providers->toArray(),
                'links' => $paginator->linkCollection()->toArray(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
            ],
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'counts' => $counts
        ]);
    }

    /**
     * Display details of a specific provider registration request.
     */
    public function show($id)
    {
        $user = User::where('role', 'provider')
            ->with(['providerProfile', 'accounts.company.licenses'])
            ->findOrFail($id);

        $type = 'doctor';
        $entityName = 'طبيب بيطري مستقل';
        $city = $user->providerProfile?->city;
        $registration_number = null;
        $services = [
            'medical' => false,
            'pharmacy' => false,
            'laboratory' => false,
        ];
        $licenses = [];

        $account = $user->accounts->first();
        if ($account && $account->company) {
            $type = 'clinic';
            $company = $account->company;
            $entityName = $company->name;
            $city = $company->city;
            $registration_number = $company->registration_number;
            
            $services = [
                'medical' => (bool)$company->has_medical_services,
                'pharmacy' => (bool)$company->has_pharmacy,
                'laboratory' => (bool)$company->has_lab,
            ];

            // Map licenses
            $licenses = $company->licenses->map(function ($lic) {
                $meta = is_string($lic->meta) ? json_decode($lic->meta, true) : $lic->meta;
                $filePath = $meta['file_path'] ?? null;
                return [
                    'id' => $lic->id,
                    'type' => $lic->type,
                    'number' => $lic->number,
                    'issued_at' => $lic->issued_at ? $lic->issued_at->format('Y-m-d') : null,
                    'expires_at' => $lic->expires_at ? $lic->expires_at->format('Y-m-d') : null,
                    'file_url' => $filePath ? asset('storage/' . $filePath) : null,
                ];
            })->toArray();
        } else if ($user->providerProfile) {
            $profile = $user->providerProfile;

            // If profile has licenses, we can query them (licensable_id = profile->id)
            $dbLicenses = License::where('licensable_id', $profile->id)
                ->where('licensable_type', ProviderProfile::class)
                ->get();

            $licenses = $dbLicenses->map(function ($lic) {
                $meta = is_string($lic->meta) ? json_decode($lic->meta, true) : $lic->meta;
                $filePath = $meta['file_path'] ?? null;
                return [
                    'id' => $lic->id,
                    'type' => $lic->type,
                    'number' => $lic->number,
                    'issued_at' => $lic->issued_at ? $lic->issued_at->format('Y-m-d') : null,
                    'expires_at' => $lic->expires_at ? $lic->expires_at->format('Y-m-d') : null,
                    'file_url' => $filePath ? asset('storage/' . $filePath) : null,
                ];
            })->toArray();

            $hasMedical = collect($licenses)->contains('type', 'medical');
            $hasPharmacy = collect($licenses)->contains('type', 'pharmacy');
            $hasLab = collect($licenses)->contains('type', 'laboratory') || collect($licenses)->contains('type', 'lab');

            $services = [
                'medical' => $hasMedical,
                'pharmacy' => $hasPharmacy,
                'laboratory' => $hasLab,
            ];
        }

        $providerData = [
            'id' => $user->id,
            'full_name' => $user->full_name,
            'email' => $user->email,
            'phone' => $user->phone,
            'type' => $type,
            'entity_name' => $entityName,
            'city' => $city,
            'registration_number' => $registration_number,
            'status' => (int) $user->status,
            'services' => $services,
            'licenses' => $licenses,
            'created_at' => $user->created_at->format('Y-m-d H:i'),
        ];

        return Inertia::render('Admin/Providers/Show', [
            'provider' => $providerData
        ]);
    }

    /**
     * Approve the provider registration request.
     */
    public function approve($id)
    {
        $user = User::findOrFail($id);

        DB::transaction(function () use ($user) {
            // Update User status to 1 (Active)
            $user->update(['status' => 1]);

            // Update associated Account & Company
            $account = Account::where('owner_id', $user->id)->first();
            if ($account) {
                $account->update(['is_active' => true]);

                $company = Company::where('account_id', $account->id)->first();
                if ($company) {
                    $company->update(['is_active' => true]);
                }
            }

            // Update associated ProviderProfile if independent doctor
            $profile = ProviderProfile::where('user_id', $user->id)->first();
            if ($profile) {
                $profile->update(['is_active' => true]);
            }
        });

        return redirect()->back()->with('success', 'تمت الموافقة على طلب مقدم الخدمة وتنشيط حسابه بنجاح.');
    }

    /**
     * Reject the provider registration request.
     */
    public function reject($id)
    {
        $user = User::findOrFail($id);

        DB::transaction(function () use ($user) {
            // Update User status to 2 (Rejected)
            $user->update(['status' => 2]);

            // Deactivate associated Account & Company
            $account = Account::where('owner_id', $user->id)->first();
            if ($account) {
                $account->update(['is_active' => false]);

                $company = Company::where('account_id', $account->id)->first();
                if ($company) {
                    $company->update(['is_active' => false]);
                }
            }

            // Deactivate associated ProviderProfile if independent doctor
            $profile = ProviderProfile::where('user_id', $user->id)->first();
            if ($profile) {
                $profile->update(['is_active' => false]);
            }
        });

        return redirect()->back()->with('success', 'تم رفض طلب مقدم الخدمة بنجاح.');
    }
}
