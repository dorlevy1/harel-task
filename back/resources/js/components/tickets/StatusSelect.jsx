import { useTranslation } from 'react-i18next';

const StatusSelect = ({ status, statuses, onChange }) => {
    const { t } = useTranslation();

    const handleChange = (e) => onChange(e.target.value);

    return (
        <select
            value={status}
            onChange={handleChange}
            className="text-xs rounded-md border-gray-300 p-1.5 border"
        >
            {statuses.map((s) => (
                <option key={s} value={s}>{t(`status.${s}`)}</option>
            ))}
        </select>
    );
};

export default StatusSelect;
