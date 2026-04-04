import { useState, useCallback } from 'react';

export const useFilters = (initialFilters) => {
    const [filters, setFilters] = useState(initialFilters || {});

    const handleFilterChange = useCallback((key, value) => {
        setFilters((prev) => {
            const next = { ...prev, [key]: value || undefined, page: undefined };
            Object.keys(next).forEach((k) => {
                if (!next[k]) delete next[k];
            });
            const params = new URLSearchParams(next).toString();
            window.history.replaceState({}, '', params ? `?${params}` : window.location.pathname);
            return next;
        });
    }, []);

    const handlePageChange = useCallback((page) => {
        setFilters((prev) => {
            const next = { ...prev, page };
            const params = new URLSearchParams(next).toString();
            window.history.replaceState({}, '', `?${params}`);
            return next;
        });
    }, []);

    return { filters, handleFilterChange, handlePageChange };
}
