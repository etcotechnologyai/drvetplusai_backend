<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\SystemSetting;

class AdminSettingsController extends Controller
{
    /**
     * Update all text-based platform settings.
     * Handles: platform_name, platform_logo_url (external), commission fields.
     */
    public function update(Request $request)
    {
        $request->validate([
            'platform_name' => 'nullable|string|max:100',
            'platform_logo_url' => 'nullable|url|max:500',
            'platform_commission' => 'nullable|numeric|min:0|max:100',
            'min_consultation_fee' => 'nullable|numeric|min:0',
            'vat_rate' => 'nullable|numeric|min:0|max:100',
            'min_withdrawal_limit' => 'nullable|numeric|min:0',
        ], [
            'platform_logo_url.url' => 'الرابط الخارجي للشعار يجب أن يكون رابطاً صحيحاً يبدأ بـ http أو https.',
        ]);

        // Save string/numeric settings
        $textFields = [
            'platform_name' => 'string',
            'platform_commission' => 'float',
            'min_consultation_fee' => 'float',
            'vat_rate' => 'float',
            'min_withdrawal_limit' => 'float',
        ];

        foreach ($textFields as $key => $type) {
            if ($request->filled($key)) {
                SystemSetting::setValue($key, $request->input($key), $type);
            }
        }

        // External URL overrides local file logo
        if ($request->filled('platform_logo_url')) {
            SystemSetting::setValue('platform_logo', $request->platform_logo_url, 'string');
        }

        return back()->with('success', 'تم حفظ الإعدادات بنجاح ✅');
    }

    /**
     * Upload a logo file from the admin's device.
     * Stores in storage/app/public/platform/ and saves the public URL.
     */
    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|file|mimes:png,jpg,jpeg,svg,webp|max:3072',
        ], [
            'logo.required' => 'الرجاء اختيار ملف شعار.',
            'logo.mimes' => 'الشعار يجب أن يكون بصيغة: png, jpg, jpeg, svg, webp.',
            'logo.max' => 'حجم الملف يجب ألا يتجاوز 3 ميغابايت.',
        ]);

        // Delete old locally-stored logo to avoid orphan files
        $oldLogo = SystemSetting::getValue('platform_logo');
        if ($oldLogo && str_contains($oldLogo, '/storage/platform/')) {
            $oldPath = str_replace('/storage/', '', $oldLogo);
            Storage::disk('public')->delete($oldPath);
        }

        $path = $request->file('logo')->store('platform', 'public');
        $url = Storage::url($path);

        SystemSetting::setValue('platform_logo', $url, 'string');

        return back()->with('success', 'تم رفع الشعار بنجاح ✅');
    }
}
