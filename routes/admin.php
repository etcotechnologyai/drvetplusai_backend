<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Dashboard\DashboardController;
use App\Http\Controllers\Admin\Provider\ProviderController;
use App\Http\Controllers\Admin\Setting\SettingsController;

/*Route::get('login', [AdminAuthController::class, 'index'])->name('login');
Route::post('login', [AdminAuthController::class, 'login']);
Route::get('logout', [AdminAuthController::class, 'logout']);

Route::get('dashboard', function () {
    return view('admins.dashboard');
})->name('dashboard');


Route::get('countries', function () {
    return view('admins.countries.index');
})->name('countries');*/



Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Providers Management
    Route::get('/providers', [ProviderController::class, 'index'])->name('providers.index');
    Route::get('/providers/{id}', [ProviderController::class, 'show'])->name('providers.show');
    Route::post('/providers/{id}/approve', [ProviderController::class, 'approve'])->name('providers.approve');
    Route::post('/providers/{id}/reject', [ProviderController::class, 'reject'])->name('providers.reject');
    Route::post('/providers/{id}/suspend', [ProviderController::class, 'suspend'])->name('providers.suspend');

    // Platforms pages
    Route::get('/companies', [DashboardController::class, 'companies'])->name('companies.index');
    Route::get('/doctors', [DashboardController::class, 'doctors'])->name('doctors.index');
    Route::get('/pet-owners', [DashboardController::class, 'petOwners'])->name('pet-owners.index');
    Route::get('/pets', [DashboardController::class, 'pets'])->name('pets.index');
    Route::get('/consultations', [DashboardController::class, 'consultations'])->name('consultations.index');
    Route::get('/appointments', [DashboardController::class, 'appointments'])->name('appointments.index');
    Route::get('/payments', [DashboardController::class, 'payments'])->name('payments.index');
    Route::get('/plans', [DashboardController::class, 'plans'])->name('plans.index');
    Route::get('/reports', [DashboardController::class, 'reports'])->name('reports.index');
    Route::get('/settings', [DashboardController::class, 'settings'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');
    Route::post('/settings/logo', [SettingsController::class, 'uploadLogo'])->name('settings.logo');
});