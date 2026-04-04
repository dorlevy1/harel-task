import TicketCard from './TicketCard';
import { useTranslation } from 'react-i18next';

const TicketList = ({ tickets, isLoading, isError, statuses, onStatusChange, onEdit }) => {
    const { t } = useTranslation();

    if (isLoading) {
        return <div className="text-center py-12 text-gray-500">{t('tickets.loading')}</div>;
    }

    if (isError) {
        return <div className="text-center py-12 text-red-500">{t('tickets.loadError')}</div>;
    }

    if (tickets.length === 0) {
        return <div className="text-center py-12 text-gray-500">{t('tickets.empty')}</div>;
    }

    return (
        <div className="space-y-3">
            {tickets.map((ticket) => (
                <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    statuses={statuses}
                    onStatusChange={onStatusChange}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default TicketList;
