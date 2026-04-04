const StatCard = ({
    label,
    value,
    borderColor = "border-gray-200",
    labelColor = "text-gray-500",
    valueColor = "text-gray-900",
}) => {
    return (
        <div
            className={`bg-white rounded-lg shadow-sm border ${borderColor} p-4`}
        >
            <p className={`text-sm ${labelColor}`}>{label}</p>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
    );
};

export default StatCard;
