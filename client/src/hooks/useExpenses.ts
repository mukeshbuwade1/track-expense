import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { expenseService } from '@/services/expenseService';
import { queryKeys } from '@/constants/queryKeys';
import { ExpenseFiltersState, ExpenseFormData } from '@/types/expense.types';
import { AxiosError } from 'axios';

const extractErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) return err.response?.data?.message ?? err.message;
  return 'Something went wrong';
};

export const useExpenseList = (filters: Partial<ExpenseFiltersState>) =>
  useQuery({
    queryKey: queryKeys.expenses.list(filters),
    queryFn: () => expenseService.list(filters),
    staleTime: 30 * 1000,
  });

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ExpenseFormData) => expenseService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.summary() });
      toast.success('Expense added!');
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ExpenseFormData }) =>
      expenseService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.summary() });
      toast.success('Expense updated!');
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expenseService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.summary() });
      toast.success('Expense deleted!');
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
};
