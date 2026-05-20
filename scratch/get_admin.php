<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$u = App\Models\User::where('email', 'admin@drvet.local')->first();
if ($u) {
    echo "USER_ID: " . $u->id . "\n";
    echo "EMAIL: " . $u->email . "\n";
    echo "ROLE: " . $u->role . "\n";
    echo "STATUS: " . $u->status . "\n";
} else {
    echo "NOT_FOUND\n";
}
