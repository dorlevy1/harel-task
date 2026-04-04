<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\StatsService;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function __construct(
        private readonly StatsService $statsService,
    ) {}

    public function overview(): JsonResponse
    {
        try {
            return response()->json($this->statsService->overview());
        } catch (\Exception $e) {
            return response()->json(['error' => __('messages.stats_unavailable')], 503);
        }
    }

    public function users(): JsonResponse
    {
        try {
            return response()->json($this->statsService->users());
        } catch (\Exception $e) {
            return response()->json(['error' => __('messages.stats_unavailable')], 503);
        }
    }
}
