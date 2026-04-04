import OverviewStats from './OverviewStats';
import PriorityBreakdown from './PriorityBreakdown';
import UserWorkload from './UserWorkload';

const StatsPanel = ({ stats }) => {
    if (!stats) return null;

    const { overview, users } = stats;

    return (
        <div className="mb-6">
            <OverviewStats overview={overview} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PriorityBreakdown byPriority={overview?.by_priority} />
                <UserWorkload users={users} />
            </div>
        </div>
    );
};

export default StatsPanel;
