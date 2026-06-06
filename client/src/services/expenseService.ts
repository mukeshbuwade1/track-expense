import axiosInstance from './axiosInstance';
import type { ApiResponse, PaginatedData } from '@/types/api.types';
import type { Expense, ExpenseFiltersState, ExpenseFormData } from '@/types/expense.types';

export const expenseService = {
  list: async (filters: Partial<ExpenseFiltersState>): Promise<PaginatedData<Expense>> => {
    const params = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined),
    );
    const { data } = await axiosInstance.get<ApiResponse<PaginatedData<Expense>>>('/expenses', { params });
    return data.data;
  },

  getById: async (id: string): Promise<Expense> => {
    const { data } = await axiosInstance.get<ApiResponse<{ expense: Expense }>>(`/expenses/${id}`);
    return data.data.expense;
  },

  create: async (payload: ExpenseFormData): Promise<Expense> => {
    const { data } = await axiosInstance.post<ApiResponse<{ expense: Expense }>>('/expenses', payload);
    return data.data.expense;
  },

  update: async (id: string, payload: ExpenseFormData): Promise<Expense> => {
    const { data } = await axiosInstance.put<ApiResponse<{ expense: Expense }>>(`/expenses/${id}`, payload);
    return data.data.expense;
  },

  remove: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/expenses/${id}`);
  },
};
