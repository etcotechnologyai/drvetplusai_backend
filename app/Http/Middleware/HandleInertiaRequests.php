<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $adminNotifications = [];

        if ($user && $user->role === 'admin') {
            // Get database notifications safely
            $dbNotifications = [];
            if (\Schema::hasTable('notifications')) {
                $dbNotifications = \App\Models\Notification::where('user_id', $user->id)
                    ->orderBy('created_at', 'desc')
                    ->limit(10)
                    ->get()
                    ->map(function ($n) {
                        return [
                            'id' => 'db_' . $n->id,
                            'type' => $n->type,
                            'title' => $n->title,
                            'body' => $n->body,
                            'is_read' => (bool) $n->is_read,
                            'url' => '#',
                            'created_at' => $n->created_at ? $n->created_at->diffForHumans() : 'سابقاً'
                        ];
                    })->toArray();
            }

            // Build dynamic system alerts
            $systemAlerts = [];

            // 1. Pending provider registrations
            $pendingProvidersCount = \App\Models\User::where('role', 'provider')->where('status', 0)->count();
            if ($pendingProvidersCount > 0) {
                $systemAlerts[] = [
                    'id' => 'sys_pending_providers',
                    'type' => 'pending_approval',
                    'title' => 'طلبات اعتماد معلقة',
                    'body' => "يوجد عدد ({$pendingProvidersCount}) طلبات اعتماد مقدمي خدمة معلقة بانتظار المراجعة.",
                    'is_read' => false,
                    'url' => '/admin/providers?status=pending',
                    'created_at' => 'تنبيه نشط'
                ];
            }

            // 2. Inactive companies
            $inactiveCompaniesCount = \App\Models\Company::where('is_active', false)->count();
            if ($inactiveCompaniesCount > 0) {
                $systemAlerts[] = [
                    'id' => 'sys_inactive_companies',
                    'type' => 'inactive_company',
                    'title' => 'منشآت بيطرية غير نشطة',
                    'body' => "يوجد عدد ({$inactiveCompaniesCount}) عيادات/منشآت مسجلة غير نشطة بانتظار التفعيل.",
                    'is_read' => false,
                    'url' => '/admin/companies',
                    'created_at' => 'تنبيه نشط'
                ];
            }

            // 3. Expiring licenses
            if (\Schema::hasTable('licenses')) {
                $expiringLicensesCount = \App\Models\License::where('expires_at', '<', now()->addDays(30))
                    ->where('status', 'active')
                    ->count();
                if ($expiringLicensesCount > 0) {
                    $systemAlerts[] = [
                        'id' => 'sys_expiring_licenses',
                        'type' => 'expiring_license',
                        'title' => 'تراخيص تنتهي قريباً',
                        'body' => "يوجد عدد ({$expiringLicensesCount}) تراخيص ومستندات ستنتهي خلال 30 يوم.",
                        'is_read' => false,
                        'url' => '/admin/providers',
                        'created_at' => 'تنبيه نشط'
                    ];
                }
            }

            $adminNotifications = array_merge($systemAlerts, $dbNotifications);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'notifications' => $adminNotifications,
            ],
            // Flash messages for success/error toasts
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
            // Global platform settings shared with every page
            'settings' => function () {
                if (!\Schema::hasTable('system_settings')) {
                    return ['platform_name' => 'Dr. VET PLUS', 'platform_logo' => null];
                }
                $name = \App\Models\SystemSetting::getValue('platform_name', 'Dr. VET PLUS');
                $logo = \App\Models\SystemSetting::getValue('platform_logo', null);
                return [
                    // Always a plain string — guards against json/array being returned
                    'platform_name' => is_string($name) && trim($name) !== '' ? trim($name) : 'Dr. VET PLUS',
                    'platform_logo' => is_string($logo) ? $logo : null,
                ];
            },
        ];
    }
}
