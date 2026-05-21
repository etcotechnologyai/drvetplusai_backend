<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Branch;
use App\Models\Location;

class BranchController extends Controller
{
    private function getClinicAccount()
    {
        $user = auth()->user();
        return $user->accounts()->whereHas('company')->with(['company'])->firstOrFail();
    }

    public function index()
    {
        $account = $this->getClinicAccount();
        $branches = Branch::where('account_id', $account->id)
            ->with('location')
            ->orderBy('is_main', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        $branchesData = $branches->map(function ($b) {
            return [
                'id' => $b->id,
                'name' => $b->name,
                'is_main' => (bool) $b->is_main,
                'has_pharmacy' => (bool) $b->has_pharmacy,
                'has_lab' => (bool) $b->has_lab,
                'is_active' => (bool) $b->is_active,
                'created_at' => $b->created_at,
            ];
        });

        return Inertia::render('Clinic/Branches', [
            'branches' => $branchesData,
            'company' => [
                'id' => $account->company->id,
                'name' => $account->company->name,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Clinic/Branches/Create', [
            'company' => $this->getClinicAccount()->company
        ]);
    }

    public function store(Request $request)
    {
        $account = $this->getClinicAccount();

        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'region' => 'nullable|string|max:150',
            'city' => 'nullable|string|max:150',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'services' => 'nullable|array',
            'status' => 'required|string|in:active,inactive',
        ]);

        $location = Location::create([
            'latitude' => 0,
            'longitude' => 0,
            'address_line' => ($validated['region'] ?? '') . ' - ' . ($validated['city'] ?? '') . ' - ' . ($validated['address'] ?? ''),
        ]);

        $services = $validated['services'] ?? [];
        $hasPharmacy = in_array('pharmacy', $services);
        $hasLab = in_array('lab', $services);

        Branch::create([
            'account_id' => $account->id,
            'name' => $validated['name'],
            'phone' => $validated['phone'] ?? null,
            'location_id' => $location->id,
            'has_pharmacy' => $hasPharmacy,
            'has_lab' => $hasLab,
            'is_active' => $validated['status'] === 'active',
            'is_main' => false,
        ]);

        return redirect()->route('clinic.branches')->with('success', 'تم إضافة الفرع بنجاح');
    }
}
