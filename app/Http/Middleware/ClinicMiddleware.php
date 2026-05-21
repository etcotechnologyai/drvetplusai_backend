<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class ClinicMiddleware
{
    /**
     * Ensure the user is an approved provider (clinic owner).
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Must be a provider
        if ($user->role !== 'provider') {
            abort(403, 'غير مصرح لك بالدخول إلى لوحة تحكم العيادة.');
        }

        // Must be approved (status = 1)
        if ((int) $user->status !== 1) {
            return redirect()->route('provider.pending');
        }

        // Must own at least one account with a company
        $account = $user->accounts()->whereHas('company')->first();
        if (!$account) {
            abort(403, 'لا توجد منشأة مرتبطة بحسابك.');
        }

        // Share the clinic context for controllers
        $request->merge(['clinic_account' => $account]);

        return $next($request);
    }
}
