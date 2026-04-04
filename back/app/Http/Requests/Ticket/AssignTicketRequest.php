<?php

declare(strict_types=1);

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class AssignTicketRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'assigned_user_id' => ['required', 'integer', 'exists:users,id'],
        ];
    }
}
