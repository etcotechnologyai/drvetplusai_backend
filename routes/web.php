<?php
use App\Http\Controllers\Auth\ProviderRegisteredUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;
use App\Models\User;
use App\Models\Company;
use App\Models\ProviderProfile;
use App\Models\Pet;
/*Route::get('/', function () {
    return view('welcome');
});*/
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
Route::get('/provider/pending-approval', [ProviderRegisteredUserController::class, 'pending'])->name('provider.pending');

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', function () {
        $user = auth()->user();

        if ($user->accounts()->where('type', 'system_admin')->exists()) {
            return redirect()->route('admin.dashboard');
        }

        if ($user->accounts()->where('type', 'provider')->exists()) {
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