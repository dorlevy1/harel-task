<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Services\TicketService;
use Illuminate\Console\Command;

class ReopenHighPriorityTickets extends Command
{
    protected $signature = 'tickets:reopen-priority';

    protected $description = 'פנייה עם high = priority שלא טופלה מעל 48 שעות תחזור אוטומטית לסטטוס open';

    public function handle(TicketService $service): int
    {
        $count = $service->reopenHighPriorityTickets();

        $this->info("נפתחו {$count} טיקטים עם עדיפות גבוהה.");

        return self::SUCCESS;
    }
}
