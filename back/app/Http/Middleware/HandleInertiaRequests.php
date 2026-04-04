<?php

namespace App\Http\Middleware;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => fn() => $request->user()
                ? ['id' => $request->user()->id, 'name' => $request->user()->name, 'email' => $request->user()->email]
                : null,
            'ticketConfig' => fn() => [
                'statuses' => array_map(fn(TicketStatus $s) => $s->value, TicketStatus::cases()),
                'priorities' => array_map(fn(TicketPriority $p) => $p->value, TicketPriority::cases()),
            ],
        ]);
    }
}
