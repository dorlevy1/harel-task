<?php

use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\StatsController;
use App\Http\Controllers\Web\TicketController;
use App\Http\Controllers\Web\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/', fn () => redirect('/tickets'));

    Route::apiResource('tickets', TicketController::class)->only(['index', 'store', 'show', 'update']);
    Route::patch('/tickets/{ticket}/status', [TicketController::class, 'changeStatus'])->name('tickets.change-status');
    Route::patch('/tickets/{ticket}/assign', [TicketController::class, 'assign'])->name('tickets.assign');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');

    Route::get('/stats/overview', [StatsController::class, 'overview'])->name('stats.overview');
    Route::get('/stats/users', [StatsController::class, 'users'])->name('stats.users');
});
