import { ExpenseFiltersState } from '@/types/expense.types';

export const queryKeys = {
  auth: {
    me: () => ['auth', 'me'] as const,
  },
  expenses: {
    all: () => ['expenses'] as const,
    list: (filters: Partial<ExpenseFiltersState>) => ['expenses', 'list', filters] as const,
    detail: (id: string) => ['expenses', 'detail', id] as const,
  },
  dashboard: {
    summary: () => ['dashboard', 'summary'] as const,
  },
};
