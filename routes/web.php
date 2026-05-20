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
    Route::get('/provider/pending-approval', [ProviderRegisteredUserController::class, 'pending'])->name('provider.pending');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        // Fetch stats safely
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

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Providers Management
    Route::get('/providers', [AdminProviderController::class, 'index'])->name('providers.index');
    Route::get('/providers/{id}', [AdminProviderController::class, 'show'])->name('providers.show');
    Route::post('/providers/{id}/approve', [AdminProviderController::class, 'approve'])->name('providers.approve');
    Route::post('/providers/{id}/reject', [AdminProviderController::class, 'reject'])->name('providers.reject');

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
});


