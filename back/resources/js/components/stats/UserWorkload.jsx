import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const UserWorkload = ({ users: usersData }) => {
    const { t } = useTranslation();
    const usersList = useMemo(() => usersData || [], [usersData]);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{t('stats.userWorkload')}</h3>
            <div className="space-y-2">
                {usersList.length > 0 ? usersList.map((u) => (
                    <div key={u.id || u.name} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{u.name}</span>
                        <span className="text-xs text-gray-500">{u.assigned_count} {t('stats.assigned')} / {u.closed_count} {t('stats.closedCount')}</span>
                    </div>
                )) : (
                    <p className="text-sm text-gray-400">{t('stats.noData')}</p>
                )}
            </div>
        </div>
    );
};

export default UserWorkload;
