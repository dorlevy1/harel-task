<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class StatsService
{
    private function baseUrl(): string
    {
        return config('services.stats.base_url', 'http://127.0.0.1:3001');
    }

    public function overview(): array
    {
        return $this->fetchFromService('/stats/overview', 'stats:overview');
    }

    public function users(): array
    {
        return $this->fetchFromService('/stats/users', 'stats:users');
    }

    private function fetchFromService(string $endpoint, string $cacheKey): array
    {
        return Cache::remember($cacheKey, 300, function () use ($endpoint) {
            $response = Http::timeout(5)
                ->withHeaders([
                    'X-Internal-Token' => config('services.stats.token'),
                ])->get($this->baseUrl() . $endpoint);

            if ($response->failed()) {
                throw new RuntimeException('Stats service is unavailable.');
            }

            return $response->json();
        });
    }
}
