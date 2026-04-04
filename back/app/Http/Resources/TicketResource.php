<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status->value,
            'priority' => $this->priority->value,
            'assigned_user_id' => $this->assigned_user_id,
            'assigned_user' => new UserResource($this->whenLoaded('assignedUser')),
            'created_by' => $this->created_by,
            'creator' => new UserResource($this->whenLoaded('creator')),
            'is_stale' => $this->status === TicketStatus::InProgress
                && $this->priority === TicketPriority::High
                && $this->updated_at?->lt(now()->subHours(48)),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
