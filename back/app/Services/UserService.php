<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class UserService
{
    public function all(): Collection
    {
        return Cache::remember('users:all', 300, fn () => User::all());
    }
}
