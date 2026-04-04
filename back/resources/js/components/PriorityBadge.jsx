import { priorityClasses } from "../utils/helper";
import { useTranslation } from 'react-i18next';

const PriorityBadge = ({ priority }) => {
    const { t } = useTranslation();

    return (
        <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityClasses[priority] || "bg-gray-100 text-gray-800"}`}
        >
            {t(`priority.${priority}`)}
        </span>
    );
};

export default PriorityBadge;
