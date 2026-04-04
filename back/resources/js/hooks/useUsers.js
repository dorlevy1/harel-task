import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await api.get('/users');
            return data.data;
        },
        staleTime: 5 * 60_000,
    });
}
