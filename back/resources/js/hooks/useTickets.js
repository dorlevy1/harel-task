import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const cleanFilters = (filters) => {
    const cleaned = {};
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            cleaned[key] = value;
        }
    });
    return cleaned;
}

export const useTickets = (filters) => {
    const cleaned = cleanFilters(filters);
    return useQuery({
        queryKey: ['tickets', cleaned],
        queryFn: async () => {
            const { data } = await api.get('/tickets', { params: cleaned });
            return data;
        },
        placeholderData: (prev) => prev,
        staleTime: 30_000,
    });
}
