import { priorityColors } from '../../utils/helper';
import { useTranslation } from 'react-i18next';

const PriorityBreakdown = ({ byPriority }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{t('stats.byPriority')}</h3>
            <div className="space-y-2">
                {byPriority && Object.entries(byPriority).map(([key, count]) => (
                    <div key={key} className="flex items-center justify-between">
                        <span className={`text-sm text-${priorityColors[key] || 'gray'}-700`}>{t('priority.' + key)}</span>
                        <span className="text-sm font-semibold text-gray-900">{count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PriorityBreakdown;
