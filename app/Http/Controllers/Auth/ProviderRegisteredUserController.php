<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Models\User;
use App\Models\ProviderProfile;
use App\Models\Company;
use App\Models\Account;
use App\Models\Activity;
use App\Models\License;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProviderRegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        return Inertia::render('Auth/ProviderRegister');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        // 1. Normalize Phone Number BEFORE Validation
        $phone = $request->input('phone');
        if ($phone) {
            $phone = preg_replace('/[^\d+]/', '', $phone);

            if (str_starts_with($phone, '+966')) {
                $phone = substr($phone, 4);
            } elseif (str_starts_with($phone, '00966')) {
                $phone = substr($phone, 5);
            } elseif (str_starts_with($phone, '966')) {
                $phone = substr($phone, 3);
            }

            if (str_starts_with($phone, '0')) {
                $phone = ltrim($phone, '0');
            }

            $normalizedPhone = '+966' . $phone;
            $request->merge(['phone' => $normalizedPhone]);
        }

        // 2. Define Validation Rules
        $rules = [
            'provider_type' => 'required|in:doctor,clinic',
            'full_name' => 'required|string|max:150',
            'email' => 'required|string|email|max:150|unique:users,email',
            'phone' => ['required', 'string', 'regex:/^\+9665\d{8}$/', 'unique:users,phone'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'clinic_name' => 'required_if:provider_type,clinic|nullable|string|max:150',
            'registration_number' => 'required|string|max:100|unique:companies,registration_number',
            'city' => 'required|string|max:150',
            'commercial_register_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'medical_services' => 'boolean',
            'pharmacy' => 'boolean',
            'laboratory' => 'boolean',
        ];

        // Conditional validation for medical services (Medical License)
        if ($request->boolean('medical_services')) {
            $rules['license_number'] = 'required|string|max:100';
            $rules['license_issue_date'] = 'required|date';
            $rules['license_expiry_date'] = 'required|date|after:license_issue_date';
            $rules['medical_license_file'] = 'required|file|mimes:pdf,jpg,jpeg,png|max:5120';
        }

        $request->validate($rules, [
            'phone.regex' => 'رقم الجوال يجب أن يكون رقم جوال سعودي صحيح يبدأ بـ 5 ويحتوي على 8 أرقام بعد ذلك.',
            'registration_number.unique' => 'رقم السجل التجاري مسجل مسبقاً لدينا.',
            'email.unique' => 'البريد الإلكتروني مسجل مسبقاً لدينا.',
            'phone.unique' => 'رقم الجوال مسجل مسبقاً لدينا.',
            'license_expiry_date.after' => 'تاريخ الانتهاء يجب أن يكون بعد تاريخ الإصدار.',
        ]);

        $commercialRegisterFilePath = null;
        $medicalLicenseFilePath = null;

        try {
            DB::beginTransaction();

            // 1. Create User with pending status (0) and role = provider
            $user = User::create([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'status' => 0, // Pending
                'role' => 'provider',
            ]);

            // Save Commercial Register File
            if ($request->hasFile('commercial_register_file')) {
                $commercialRegisterFilePath = $request->file('commercial_register_file')->store('company-documents', 'public');
            }

            // Save Medical License File if present
            if ($request->boolean('medical_services') && $request->hasFile('medical_license_file')) {
                $medicalLicenseFilePath = $request->file('medical_license_file')->store('licenses', 'public');
            }

            if ($request->provider_type === 'doctor') {
                $countryId = DB::table('countries')->insertGetId([
                    'iso_code' => 'SA',
                    'name' => 'Saudi Arabia',
                    'phone_code' => '+966',
                    'created_at' => now(),
                    'updated_at' => now()
                ]) ?? DB::table('countries')->first()->id;

                $profile = ProviderProfile::create([
                    'user_id' => $user->id,
                    'national_id' => '0000000000',
                    'nationality_id' => $countryId,
                    'city' => $request->city,
                ]);

                if ($request->boolean('medical_services')) {
                    $profile->licenses()->create([
                        'type' => 'medical',
                        'number' => $request->license_number,
                        'issued_at' => $request->license_issue_date,
                        'expires_at' => $request->license_expiry_date,
                        'meta' => $medicalLicenseFilePath ? json_encode(['file_path' => $medicalLicenseFilePath]) : null,
                    ]);
                }
            } else {
                // Clinic setup
                $account = Account::create([
                    'name' => $request->clinic_name,
                    'type' => 'company',
                    'owner_id' => $user->id,
                    'is_active' => false,
                ]);

                $activityId = DB::table('activities')->where('code', 'VET_CLINIC')->first()->id ?? DB::table('activities')->insertGetId([
                    'code' => 'VET_CLINIC',
                    'name' => 'Veterinary Clinic',
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now()
                ]) ?? DB::table('activities')->first()->id;

                $company = Company::create([
                    'account_id' => $account->id,
                    'activity_id' => $activityId,
                    'name' => $request->clinic_name,
                    'registration_number' => $request->registration_number,
                    'city' => $request->city,
                    'is_active' => false,
                    'has_medical_services' => $request->boolean('medical_services'),
                    'has_pharmacy' => $request->boolean('pharmacy'),
                    'has_lab' => $request->boolean('laboratory'),
                ]);

                // 1. Create Commercial Register License
                License::create([
                    'licensable_id' => $company->id,
                    'licensable_type' => Company::class,
                    'type' => 'commercial',
                    'number' => $request->registration_number,
                    'meta' => $commercialRegisterFilePath ? json_encode(['file_path' => $commercialRegisterFilePath]) : null,
                ]);

                // 2. Create Medical License (if checked)
                if ($request->boolean('medical_services')) {
                    License::create([
                        'licensable_id' => $company->id,
                        'licensable_type' => Company::class,
                        'type' => 'medical',
                        'number' => $request->license_number,
                        'issued_at' => $request->license_issue_date,
                        'expires_at' => $request->license_expiry_date,
                        'meta' => $medicalLicenseFilePath ? json_encode(['file_path' => $medicalLicenseFilePath]) : null,
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('provider.pending');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Provider registration failed: ' . $e->getMessage());
            
            // Delete uploaded files on failure
            if ($commercialRegisterFilePath) {
                Storage::disk('public')->delete($commercialRegisterFilePath);
            }
            if ($medicalLicenseFilePath) {
                Storage::disk('public')->delete($medicalLicenseFilePath);
            }

            $errorMessage = config('app.debug') 
                ? 'خطأ في النظام: ' . $e->getMessage() 
                : 'حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى.';

            return back()->withErrors(['error' => $errorMessage]);
        }
    }

    public function pending()
    {
        return Inertia::render('Auth/ProviderPendingApproval');
    }
}
