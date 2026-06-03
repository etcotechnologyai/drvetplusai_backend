<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\User;
use App\Models\Role;
use App\Models\Account;
use App\Models\Company;
use App\Models\Membership;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Services\Media\MediaService;
use App\Services\License\LicenseService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
class ProviderRegisteredUserController
{

    public function create()
    {
        $activities = Activity::orderBy('name')->get();
        return Inertia::render('Auth/ProviderRegister', compact('activities'));
    }
    public function store(Request $request, LicenseService $licenseService, MediaService $mediaService)
    {
        $request->merge([
            'phone' => $this->normalizeSaudiPhone($request->phone),
        ]);

        $request->validate([
            'owner_name' => [
                'required',
                'string',
                'max:150',
            ],

            'phone' => [
                'required',
                'string',
                'max:20',
                'unique:users,phone',
            ],

            'email' => [
                'required',
                'email',
                'max:150',
                'unique:users,email',
            ],
            'activity_id' => [
                'required',
                'exists:activities,id',
            ],

            'company_name' => [
                'required',
                'string',
                'max:150',
            ],

            'legal_name' => [
                'required',
                'string',
                'max:150',
            ],

            'registration_number' => [
                'required',
                'string',
                'max:100',
                'unique:companies,registration_number',
            ],
            'commercial_issued_at' => [
                'required',
                'date',
            ],

            'commercial_expires_at' => [
                'required',
                'date',
                'after_or_equal:commercial_issued_at',
            ],
            'commercial_license_file' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,pdf',
                'max:5120',
            ],
            'has_medical_services' => [
                'nullable',
                'boolean',
            ],

            'has_pharmacy' => [
                'nullable',
                'boolean',
            ],

            'has_lab' => [
                'nullable',
                'boolean',
            ],
            'medical_license_number' => [
                'required_if:has_medical_services,1',
                'nullable',
                'string',
                'max:100',
                'unique:licenses,number',
            ],

            'license_issue_date' => [
                'required_if:has_medical_services,1',
                'nullable',
                'date',
            ],

            'license_expiry_date' => [
                'required_if:has_medical_services,1',
                'nullable',
                'date',
                'after_or_equal:license_issue_date',
            ],

            'medical_license_file' => [
                'required_if:has_medical_services,1',
                'nullable',
                'file',
                'mimes:jpg,jpeg,png,pdf',
                'max:5120',
            ],

        ], [

            'activity_id.required' => 'يجب تحديد نوع النشاط.',
            'activity_id.exists' => 'نوع النشاط المحدد غير صالح.',


            'owner_name.required' => 'اسم المفوض مطلوب.',
            'owner_name.max' => 'اسم المفوض طويل جداً.',


            'phone.required' => 'رقم الجوال مطلوب.',
            'phone.unique' => 'رقم الجوال مستخدم مسبقًا.',
            'phone.max' => 'رقم الجوال غير صحيح.',

            'email.required' => 'البريد الإلكتروني مطلوب.',
            'email.email' => 'صيغة البريد الإلكتروني غير صحيحة.',
            'email.unique' => 'البريد الإلكتروني مستخدم مسبقًا.',
            'email.max' => 'البريد الإلكتروني طويل جداً.',


            'company_name.required' => 'اسم المنشأة مطلوب.',
            'company_name.max' => 'اسم المنشأة طويل جداً.',


            'legal_name.required' => 'الاسم التجاري مطلوب.',
            'legal_name.max' => 'الاسم التجاري طويل جداً.',


            'registration_number.required' => 'رقم السجل التجاري مطلوب.',
            'registration_number.unique' => 'رقم السجل التجاري مسجل مسبقًا.',
            'registration_number.max' => 'رقم السجل التجاري غير صحيح.',


            'commercial_issued_at.required' => 'تاريخ إصدار السجل التجاري مطلوب.',
            'commercial_issued_at.date' => 'تاريخ إصدار السجل التجاري غير صحيح.',

            'commercial_expires_at.required' => 'تاريخ انتهاء السجل التجاري مطلوب.',
            'commercial_expires_at.date' => 'تاريخ انتهاء السجل التجاري غير صحيح.',
            'commercial_expires_at.after_or_equal' => 'تاريخ انتهاء السجل التجاري يجب أن يكون بعد أو مساويًا لتاريخ الإصدار.',


            'commercial_license_file.required' => 'يرجى إرفاق السجل التجاري.',
            'commercial_license_file.file' => 'ملف السجل التجاري غير صالح.',
            'commercial_license_file.mimes' => 'صيغة ملف السجل التجاري يجب أن تكون PDF أو JPG أو PNG.',
            'commercial_license_file.max' => 'حجم ملف السجل التجاري يجب ألا يتجاوز 5 ميجابايت.',


            'medical_license_number.required_if' => 'رقم الترخيص الطبي مطلوب.',
            'medical_license_number.unique' => 'رقم الترخيص الطبي مسجل مسبقًا.',
            'medical_license_number.max' => 'رقم الترخيص الطبي غير صحيح.',

            'license_issue_date.required_if' => 'تاريخ إصدار الترخيص الطبي مطلوب.',
            'license_issue_date.date' => 'تاريخ إصدار الترخيص الطبي غير صحيح.',

            'license_expiry_date.required_if' => 'تاريخ انتهاء الترخيص الطبي مطلوب.',
            'license_expiry_date.date' => 'تاريخ انتهاء الترخيص الطبي غير صحيح.',
            'license_expiry_date.after_or_equal' => 'تاريخ انتهاء الترخيص الطبي يجب أن يكون بعد أو مساويًا لتاريخ الإصدار.',


            'medical_license_file.required_if' => 'يرجى إرفاق الترخيص الطبي.',
            'medical_license_file.file' => 'ملف الترخيص الطبي غير صالح.',
            'medical_license_file.mimes' => 'صيغة ملف الترخيص الطبي يجب أن تكون PDF أو JPG أو PNG.',
            'medical_license_file.max' => 'حجم ملف الترخيص الطبي يجب ألا يتجاوز 5 ميجابايت.',

        ]);

        DB::transaction(function () use ($request, $licenseService, $mediaService) {


            $user = User::create([
                'full_name' => $request->owner_name,
                'phone' => $request->phone,
                'email' => $request->email,
                'password' => Hash::make('TemporaryPassword@123'),
                'status' => 0,
            ]);


            $account = Account::create([
                'name' => $request->company_name,
                'type' => 'company',
                'owner_id' => $user->id,
                'is_active' => true,
            ]);

            $company = Company::create([
                'account_id' => $account->id,
                'activity_id' => $request->activity_id,
                'name' => $request->company_name,
                'legal_name' => $request->legal_name,
                'registration_number' => $request->registration_number,
                'has_medical_services' => $request->boolean('has_medical_services'),
                'has_pharmacy' => $request->boolean('has_pharmacy'),
                'has_lab' => $request->boolean('has_lab'),
                'is_active' => false,
            ]);

            $ownerRole = Role::where('code', 'company_owner')->first();

            if ($ownerRole) {
                Membership::create([
                    'user_id' => $user->id,
                    'account_id' => $account->id,
                    'role_id' => $ownerRole->id,
                    'is_active' => true,
                ]);
            }
            $commercial = $licenseService->create(
                $company,
                [
                    'type' => 'commercial',
                    'issuer' => 'MOC',
                    'number' => $request->registration_number,
                    'issued_at' => $request->commercial_issued_at,
                    'expires_at' => $request->commercial_expires_at,
                    'status' => 'active',
                ]
            );
            $mediaService->upload(
                file: $request->file('commercial_license_file'),
                model: $commercial,
                usageType: 'commercial_license',
                isPrimary: false,
                disk: 'public',
                altText: 'Commercial License'
            );
            if ($request->boolean('has_medical_services')) {
                $license = $licenseService->create(
                    $company,
                    [
                        'type' => 'medical',
                        'issuer' => 'Medical Authority',
                        'number' => $request->medical_license_number,
                        'license_issue_date' => $request->license_issue_date,
                        'license_expiry_date' => $request->license_expiry_date,
                        'status' => 'active',
                    ]
                );
                $mediaService->upload(
                    file: $request->file('medical_license_file'),
                    model: $license,
                    usageType: 'medical_license',
                    isPrimary: false,
                    disk: 'public',
                    altText: 'Medical License'
                );
            }
        });


        return redirect()->route('provider.pending');
    }
    private function normalizeSaudiPhone(?string $phone): ?string
    {
        if (!$phone) {
            return null;
        }

        $phone = preg_replace('/\D/', '', $phone);

        if (str_starts_with($phone, '0')) {
            $phone = substr($phone, 1);
        }

        if (str_starts_with($phone, '966')) {
            return $phone;
        }

        return '+966' . $phone;
    }
    public function pending()
    {
        return Inertia::render('Auth/ProviderPendingApproval');
    }
}