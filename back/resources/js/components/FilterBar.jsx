import SelectField from './SelectField';
import { useTranslation } from 'react-i18next';

const FilterBar = ({ filters, users, ticketConfig, onFilterChange }) => {
    const { t } = useTranslation();

    const userOptions = users.map((u) => ({ value: u.id, label: u.name }));
    const statusOptions = ticketConfig.statuses.map((s) => ({ value: s, label: t(`status.${s}`) }));
    const priorityOptions = ticketConfig.priorities.map((p) => ({ value: p, label: t(`priority.${p}`) }));

    const handleStatusChange = (e) => onFilterChange('status', e.target.value);
    const handlePriorityChange = (e) => onFilterChange('priority', e.target.value);
    const handleUserChange = (e) => onFilterChange('assigned_user_id', e.target.value);
    const handleSortByChange = (e) => onFilterChange('sort_by', e.target.value);
    const handleDirectionChange = (e) => onFilterChange('sort_direction', e.target.value);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <SelectField
                    label={t('filter.status')}
                    value={filters.status || ''}
                    onChange={handleStatusChange}
                    options={statusOptions}
                    placeholder={t('filter.allStatuses')}
                />
                <SelectField
                    label={t('filter.priority')}
                    value={filters.priority || ''}
                    onChange={handlePriorityChange}
                    options={priorityOptions}
                    placeholder={t('filter.allPriorities')}
                />
                <SelectField
                    label={t('filter.assignedUser')}
                    value={filters.assigned_user_id || ''}
                    onChange={handleUserChange}
                    options={userOptions}
                    placeholder={t('filter.allUsers')}
                />
                <SelectField
                    label={t('filter.sortBy')}
                    value={filters.sort_by || 'created_at'}
                    onChange={handleSortByChange}
                    options={[
                        { value: 'created_at', label: t('filter.dateCreated') },
                        { value: 'priority', label: t('filter.priority') },
                        { value: 'status', label: t('filter.status') },
                    ]}
                />
                <SelectField
                    label={t('filter.direction')}
                    value={filters.sort_direction || 'desc'}
                    onChange={handleDirectionChange}
                    options={[
                        { value: 'desc', label: t('filter.descending') },
                        { value: 'asc', label: t('filter.ascending') },
                    ]}
                />
            </div>
        </div>
    );
};

export default FilterBar;
