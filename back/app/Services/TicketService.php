<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Exceptions\TicketException;
use App\Models\Ticket;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class TicketService
{
    public function list(
        ?TicketStatus $status = null,
        ?TicketPriority $priority = null,
        ?int $assignedUserId = null,
        string $sortBy = 'created_at',
        string $sortDirection = 'desc',
        int $perPage = 15,
    ): LengthAwarePaginator {

        
        $version = Cache::get('tickets:version', 1);
        $cacheKey = "tickets:v{$version}:" . md5(serialize([
            $status?->value, $priority?->value, $assignedUserId,
            $sortBy, $sortDirection, $perPage,
            request()->input('page', 1)
        ]));

        return Cache::remember($cacheKey, 180, function () use ($status, $priority, $assignedUserId, $sortBy, $sortDirection, $perPage) {
            $query = Ticket::query()
                ->with(['assignedUser', 'creator'])
                ->filterByStatus($status)
                ->filterByPriority($priority)
                ->filterByUser($assignedUserId);

            $this->applySorting($query, $sortBy, $sortDirection);

            return $query->paginate($perPage);
        });
    }

    private function applySorting(Builder $query, string $sortBy, string $sortDirection): Builder
    {
        if ($sortBy === 'priority') {
            $query->orderByRaw("
                CASE priority
                    WHEN 'high' THEN 3
                    WHEN 'medium' THEN 2
                    WHEN 'low' THEN 1
                    ELSE 0
                END {$sortDirection}
            ");
        } elseif ($sortBy === 'status') {
            $query->orderByRaw("
                CASE status
                    WHEN 'open' THEN 1
                    WHEN 'in_progress' THEN 2
                    WHEN 'closed' THEN 3
                    ELSE 0
                END {$sortDirection}
            ");
        } else {
            $query->orderBy($sortBy, $sortDirection);
        }

        return $query->orderBy('id', $sortDirection);
    }

    public function create(array $data): Ticket
    {
        $ticket = Ticket::create($data);

        $this->clearCache();

        return $ticket->refresh();
    }

    public function update(Ticket $ticket, array $data): Ticket
    {
        $ticket->update($data);

        $this->clearCache();

        return $ticket->refresh();
    }

    public function changeStatus(Ticket $ticket, TicketStatus $newStatus): Ticket
    {
        if ($newStatus === TicketStatus::Closed && ! $ticket->isAssigned()) {
            throw TicketException::cannotCloseUnassigned();
        }

        $ticket->update(['status' => $newStatus]);

        $this->clearCache();

        return $ticket->refresh();
    }

    public function assignUser(Ticket $ticket, int $userId): Ticket
    {
        $ticket->update(['assigned_user_id' => $userId]);

        $this->clearCache();

        return $ticket->refresh();
    }

    // bump version instead of flushing individual keys — way cheaper than tracking all cache permutations
    private function clearCache(): void
    {
        if (! Cache::increment('tickets:version')) {
            Cache::forever('tickets:version', 2);
        }
        Cache::forget('stats:overview');
        Cache::forget('stats:users');
    }

    public function reopenHighPriorityTickets(): int
    {
        $count = Ticket::query()
            ->highPriority()
            ->update(['status' => TicketStatus::Open->value]);

        if ($count > 0) {
            $this->clearCache();
        }

        return $count;
    }
}
