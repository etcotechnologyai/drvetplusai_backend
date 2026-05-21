<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ProviderRegisteredUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Company;
use App\Models\ProviderProfile;
use App\Models\Pet;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    // Provider Registration
    Route::get('/register/provider', [ProviderRegisteredUserController::class, 'create'])->name('provider.register');
    Route::post('/register/provider', [ProviderRegisteredUserController::class, 'store']);
});

// Provider pending-approval page (accessible for both guest and authenticated)
Route::get('/provider/pending-approval', [ProviderRegisteredUserController::class, 'pending'])->name('provider.pending');

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', function () {
        $user = auth()->user();

        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        if ($user->role === 'provider') {
            if ((int) $user->status === 1 && $user->accounts()->whereHas('company')->exists()) {
                return redirect()->route('clinic.dashboard');
            }
            return redirect()->route('provider.pending');
        }

        // Regular user dashboard
        $stats = [
            'users' => User::count(),
            'clinics' => class_exists(Company::class) ? Company::count() : 0,
            'doctors' => class_exists(ProviderProfile::class) ? ProviderProfile::count() : 0,
            'pets' => class_exists(Pet::class) ? Pet::count() : 0,
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    })->name('dashboard');
});

// Admin Namespace Routes
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminProviderController;
use App\Http\Controllers\Admin\AdminSettingsController;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Providers Management
    Route::get('/providers', [AdminProviderController::class, 'index'])->name('providers.index');
    Route::get('/providers/{id}', [AdminProviderController::class, 'show'])->name('providers.show');
    Route::post('/providers/{id}/approve', [AdminProviderController::class, 'approve'])->name('providers.approve');
    Route::post('/providers/{id}/reject', [AdminProviderController::class, 'reject'])->name('providers.reject');
    Route::post('/providers/{id}/suspend', [AdminProviderController::class, 'suspend'])->name('providers.suspend');

    // Platforms pages
    Route::get('/companies', [AdminDashboardController::class, 'companies'])->name('companies.index');
    Route::get('/doctors', [AdminDashboardController::class, 'doctors'])->name('doctors.index');
    Route::get('/pet-owners', [AdminDashboardController::class, 'petOwners'])->name('pet-owners.index');
    Route::get('/pets', [AdminDashboardController::class, 'pets'])->name('pets.index');
    Route::get('/consultations', [AdminDashboardController::class, 'consultations'])->name('consultations.index');
    Route::get('/appointments', [AdminDashboardController::class, 'appointments'])->name('appointments.index');
    Route::get('/payments', [AdminDashboardController::class, 'payments'])->name('payments.index');
    Route::get('/plans', [AdminDashboardController::class, 'plans'])->name('plans.index');
    Route::get('/reports', [AdminDashboardController::class, 'reports'])->name('reports.index');
    Route::get('/settings', [AdminDashboardController::class, 'settings'])->name('settings.index');
    Route::post('/settings', [AdminSettingsController::class, 'update'])->name('settings.update');
    Route::post('/settings/logo', [AdminSettingsController::class, 'uploadLogo'])->name('settings.logo');
});

// Clinic Namespace Routes
use App\Http\Controllers\Clinic\ClinicDashboardController;

Route::middleware(['auth', 'clinic'])->prefix('clinic')->name('clinic.')->group(function () {
    Route::get('/dashboard', [ClinicDashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ClinicDashboardController::class, 'profile'])->name('profile');
    Route::get('/branches', [\App\Http\Controllers\Clinic\BranchController::class, 'index'])->name('branches');
    Route::get('/branches/create', [\App\Http\Controllers\Clinic\BranchController::class, 'create'])->name('branches.create');
    Route::post('/branches', [\App\Http\Controllers\Clinic\BranchController::class, 'store'])->name('branches.store');

    Route::get('/doctors', [\App\Http\Controllers\Clinic\DoctorController::class, 'index'])->name('doctors');
    Route::get('/doctors/create', [\App\Http\Controllers\Clinic\DoctorController::class, 'create'])->name('doctors.create');
    Route::post('/doctors', [\App\Http\Controllers\Clinic\DoctorController::class, 'store'])->name('doctors.store');

    Route::get('/appointments', [\App\Http\Controllers\Clinic\AppointmentController::class, 'index'])->name('appointments');
    Route::get('/appointments/create', [\App\Http\Controllers\Clinic\AppointmentController::class, 'create'])->name('appointments.create');
    Route::post('/appointments', [\App\Http\Controllers\Clinic\AppointmentController::class, 'store'])->name('appointments.store');

    Route::get('/consultations', [ClinicDashboardController::class, 'consultations'])->name('consultations');
    Route::get('/settings', [ClinicDashboardController::class, 'settings'])->name('settings');
});
