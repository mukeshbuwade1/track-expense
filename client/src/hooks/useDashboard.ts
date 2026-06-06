import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';
import { queryKeys } from '@/constants/queryKeys';

export const useDashboardSummary = () =>
  useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: dashboardService.getSummary,
    staleTime: 60 * 1000,
  });
