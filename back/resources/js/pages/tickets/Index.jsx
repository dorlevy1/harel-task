import { usePage } from "@inertiajs/react";
import AppLayout from "../../layouts/AppLayout";
import FilterBar from "../../components/FilterBar";
import TicketList from "../../components/tickets/TicketList";
import Pagination from "../../components/Pagination";
import TicketModal from "../../components/tickets/TicketModal";
import StatsPanel from "../../components/stats/StatsPanel";
import Toast from "../../components/Toast";
import { useTickets } from "../../hooks/useTickets";
import { useUsers } from "../../hooks/useUsers";
import { useStats } from "../../hooks/useStats";
import { useChangeStatus } from "../../hooks/useTicketMutations";
import { useFilters } from "../../hooks/useFilters";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
import { useTranslation } from "react-i18next";

const Index = ({ filters: initialFilters }) => {
    const { t } = useTranslation();
    const { ticketConfig } = usePage().props;

    const { filters, handleFilterChange, handlePageChange } =
        useFilters(initialFilters);
    const { isOpen, data: modalTicket, openModal, closeModal } = useModal();
    const { toast, showToast, dismissToast } = useToast();

    const {
        data: ticketsData,
        isLoading: ticketsLoading,
        isError: ticketsError,
    } = useTickets(filters);
    const { data: users } = useUsers();
    const { data: stats } = useStats();
    const changeStatus = useChangeStatus();

    const tickets = ticketsData?.data || [];
    const meta = ticketsData?.meta || null;

    const handleStatusChange = (ticketId, newStatus) => {
        changeStatus.mutate(
            { id: ticketId, status: newStatus },
            {
                onSuccess: () => showToast(t("tickets.statusUpdated")),
                onError: (err) =>
                    showToast(
                        err.response?.data?.message ||
                            t("tickets.statusUpdateFailed"),
                        "error",
                    ),
            },
        );
    };

    return (
        <AppLayout>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {t("tickets.title")}
                </h1>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                    {t("tickets.newTicket")}
                </button>
            </div>

            <StatsPanel stats={stats} />

            <FilterBar
                filters={filters}
                users={users || []}
                ticketConfig={ticketConfig}
                onFilterChange={handleFilterChange}
            />

            <TicketList
                tickets={tickets}
                isLoading={ticketsLoading}
                isError={ticketsError}
                statuses={ticketConfig.statuses}
                onStatusChange={handleStatusChange}
                onEdit={openModal}
            />

            <Pagination meta={meta} onPageChange={handlePageChange} />

            <TicketModal
                isOpen={isOpen}
                ticket={modalTicket}
                users={users || []}
                priorities={ticketConfig.priorities}
                onClose={closeModal}
                onToast={showToast}
            />

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onDismiss={dismissToast}
                />
            )}
        </AppLayout>
    );
};

export default Index;
