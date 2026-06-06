import axiosInstance from './axiosInstance';
import type { ApiResponse } from '@/types/api.types';
import type { DashboardSummary } from '@/types/dashboard.types';

export const dashboardService = {
  getSummary: async (): Promise<DashboardSummary> => {
    const { data } = await axiosInstance.get<ApiResponse<DashboardSummary>>('/dashboard/summary');
    return data.data;
  },
};
