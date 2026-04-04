export const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('he-IL', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
};

export const priorityClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
};

export const priorityColors = {
    high: 'red',
    medium: 'yellow',
    low: 'green',
};
