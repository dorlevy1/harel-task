<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Exceptions\TicketException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Ticket\AssignTicketRequest;
use App\Http\Requests\Ticket\ChangeStatusRequest;
use App\Http\Requests\Ticket\ListTicketsRequest;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Http\Requests\Ticket\UpdateTicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Services\TicketService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function __construct(
        private readonly TicketService $ticketService,
    ) {}

    public function index(ListTicketsRequest $request): Response|AnonymousResourceCollection
    {
        $validated = $request->validated();

        $tickets = $this->ticketService->list(
            status: isset($validated['status']) ? TicketStatus::from($validated['status']) : null,
            priority: isset($validated['priority']) ? TicketPriority::from($validated['priority']) : null,
            assignedUserId: isset($validated['assigned_user_id']) ? (int) $validated['assigned_user_id'] : null,
            sortBy: $validated['sort_by'] ?? 'created_at',
            sortDirection: $validated['sort_direction'] ?? 'desc',
            perPage: $validated['per_page'] ?? 15,
        );

        if ($request->wantsJson()) {
            return TicketResource::collection($tickets);
        }

        return Inertia::render('tickets/Index', [
            'filters' => $request->only(['status', 'priority', 'assigned_user_id', 'sort_by', 'sort_direction']),
        ]);
    }

    public function show(Ticket $ticket): TicketResource
    {
        return new TicketResource($ticket->load(['assignedUser', 'creator']));
    }

    public function store(StoreTicketRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;

        $ticket = $this->ticketService->create($data);

        return (new TicketResource($ticket->load(['assignedUser', 'creator'])))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket): TicketResource
    {
        $ticket = $this->ticketService->update($ticket, $request->validated());

        return new TicketResource($ticket->load(['assignedUser', 'creator']));
    }

    public function changeStatus(ChangeStatusRequest $request, Ticket $ticket): JsonResponse
    {
        try {
            $ticket = $this->ticketService->changeStatus(
                $ticket,
                TicketStatus::from($request->validated('status')),
            );

            return (new TicketResource($ticket->load(['assignedUser', 'creator'])))
                ->response()
                ->setStatusCode(200);
        } catch (TicketException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function assign(AssignTicketRequest $request, Ticket $ticket): TicketResource
    {
        $ticket = $this->ticketService->assignUser(
            $ticket,
            (int) $request->validated('assigned_user_id'),
        );

        return new TicketResource($ticket->load(['assignedUser', 'creator']));
    }
}
