<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'assigned_user_id',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'status' => TicketStatus::class,
            'priority' => TicketPriority::class,
        ];
    }

    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeFilterByStatus(Builder $query, ?TicketStatus $status): Builder
    {
        return $status ? $query->where('status', $status->value) : $query;
    }

    public function scopeFilterByPriority(Builder $query, ?TicketPriority $priority): Builder
    {
        return $priority ? $query->where('priority', $priority->value) : $query;
    }

    public function scopeFilterByUser(Builder $query, ?int $userId): Builder
    {
        return $userId ? $query->where('assigned_user_id', $userId) : $query;
    }

    public function scopeHighPriority(Builder $query): Builder
    {
        return $query
            ->where('priority', TicketPriority::High->value)
            ->where('status', TicketStatus::InProgress->value)
            ->where('updated_at', '<=', now()->subHours(48));
    }

    public function isAssigned(): bool
    {
        return $this->assigned_user_id !== null;
    }
}
