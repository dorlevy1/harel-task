import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const [overview, users] = await Promise.all([
                api.get('/stats/overview'),
                api.get('/stats/users'),
            ]);
            return {
                overview: overview.data,
                users: users.data.data,
            };
        },
        staleTime: 60_000,
        retry: 1,
    });
}
