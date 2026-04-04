import { formatDate } from '../../utils/helper';
import PriorityBadge from '../PriorityBadge';
import StatusSelect from './StatusSelect';
import { useTranslation } from 'react-i18next';

const TicketCard = ({ ticket, statuses, onStatusChange, onEdit }) => {
    const { t } = useTranslation();

    const handleStatusChange = (newStatus) => onStatusChange(ticket.id, newStatus);
    const handleEdit = () => onEdit(ticket);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{ticket.title}</h3>
                        <span className="text-xs text-gray-400">#{ticket.id}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{ticket.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{formatDate(ticket.created_at)}</span>
                        <span>{ticket.assigned_user ? ticket.assigned_user.name : <em>{t('ticket.unassigned')}</em>}</span>
                        {ticket.creator && <span>{t('ticket.createdBy')} {ticket.creator.name}</span>}
                        {ticket.is_stale && <span className="text-red-600 font-medium">{t('ticket.stale')}</span>}
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <PriorityBadge priority={ticket.priority} />
                    <StatusSelect
                        status={ticket.status}
                        statuses={statuses}
                        onChange={handleStatusChange}
                    />
                    <button
                        onClick={handleEdit}
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title={t('ticket.edit')}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
