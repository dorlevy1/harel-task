<?php

declare(strict_types=1);

namespace App\Exceptions;

use InvalidArgumentException;

class TicketException extends InvalidArgumentException
{
    public static function cannotCloseUnassigned(): self
    {
        return new self(__('messages.cannot_close_unassigned'));
    }
}
