<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Appointment;
use App\Models\User;
use App\Models\Pet;
use App\Models\Branch;
use App\Models\ProviderAssignment;
use App\Models\AnimalType;

class AppointmentController extends Controller
{
    private function getClinicAccount()
    {
        $user = auth()->user();
        return $user->accounts()->whereHas('company')->with(['company'])->firstOrFail();
    }

    public function index()
    {
        $account = $this->getClinicAccount();

        $appointments = Appointment::where('appointments.account_id', $account->id)
            ->join('users', 'appointments.user_id', '=', 'users.id')
            ->leftJoin('pets', 'appointments.pet_id', '=', 'pets.id')
            ->leftJoin('branches', 'appointments.branch_id', '=', 'branches.id')
            ->leftJoin('provider_assignments', 'appointments.provider_assignment_id', '=', 'provider_assignments.id')
            ->leftJoin('provider_profiles', 'provider_assignments.provider_id', '=', 'provider_profiles.id')
            ->leftJoin('users as doctors', 'provider_profiles.user_id', '=', 'doctors.id')
            ->select([
                'appointments.*',
                'users.full_name as client_name',
                'pets.name as pet_name',
                'branches.name as branch_name',
                'doctors.full_name as doctor_name',
            ])
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->get();

        return Inertia::render('Clinic/Appointments', [
            'appointments' => $appointments,
            'company' => $account->company,
        ]);
    }

    public function create()
    {
        $account = $this->getClinicAccount();

        $branches = Branch::where('account_id', $account->id)->get();
        // Get doctors for this account
        $doctors = \DB::table('provider_assignments')
            ->join('provider_profiles', 'provider_assignments.provider_id', '=', 'provider_profiles.id')
            ->join('users', 'provider_profiles.user_id', '=', 'users.id')
            ->where('provider_assignments.account_id', $account->id)
            ->where('provider_assignments.is_active', true)
            ->select([
                'provider_assignments.id as assignment_id',
                'users.full_name as name',
            ])->get();

        return Inertia::render('Clinic/Appointments/Create', [
            'company' => $account->company,
            'branches' => $branches,
            'doctors' => $doctors
        ]);
    }

    public function store(Request $request)
    {
        $account = $this->getClinicAccount();

        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'client_phone' => 'required|string|max:255',
            'pet_name' => 'nullable|string|max:255',
            'branch_id' => 'required|exists:branches,id',
            'doctor_id' => 'required|exists:provider_assignments,id',
            'date' => 'required|date',
            'time' => 'required',
            'type' => 'required|string',
            'status' => 'required|in:scheduled,completed,cancelled',
        ]);

        // Find or create user
        $user = User::firstOrCreate([
            'phone' => $validated['client_phone'],
        ], [
            'full_name' => $validated['client_name'],
            'password' => bcrypt(\Illuminate\Support\Str::random(10)),
            'role' => 'client',
            'status' => 1
        ]);

        // Find or create pet
        $petId = null;
        if (!empty($validated['pet_name'])) {
            $animalType = AnimalType::first();
            if (!$animalType) {
                $animalType = AnimalType::create(['name' => 'General']);
            }

            $pet = Pet::firstOrCreate([
                'name' => $validated['pet_name'],
                'user_id' => $user->id,
            ], [
                'animal_type_id' => $animalType->id
            ]);
            $petId = $pet->id;
        }

        Appointment::create([
            'account_id' => $account->id,
            'user_id' => $user->id,
            'pet_id' => $petId,
            'branch_id' => $validated['branch_id'],
            'provider_assignment_id' => $validated['doctor_id'],
            'date' => $validated['date'],
            'time' => $validated['time'],
            'type' => $validated['type'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('clinic.appointments')->with('success', 'تم إضافة الموعد بنجاح');
    }
}
