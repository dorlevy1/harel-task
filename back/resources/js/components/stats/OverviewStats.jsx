import StatCard from "../StatCard";
import { useTranslation } from 'react-i18next';

const OverviewStats = ({ overview }) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <StatCard label={t("stats.total")} value={overview?.total || 0} />
            <StatCard
                label={t("stats.open")}
                value={overview?.by_status?.open || 0}
                borderColor="border-blue-200"
                labelColor="text-blue-600"
                valueColor="text-blue-700"
            />
            <StatCard
                label={t("stats.inProgress")}
                value={overview?.by_status?.in_progress || 0}
                borderColor="border-yellow-200"
                labelColor="text-yellow-600"
                valueColor="text-yellow-700"
            />
            <StatCard
                label={t("stats.closed")}
                value={overview?.by_status?.closed || 0}
                borderColor="border-green-200"
                labelColor="text-green-600"
                valueColor="text-green-700"
            />
        </div>
    );
};

export default OverviewStats;
