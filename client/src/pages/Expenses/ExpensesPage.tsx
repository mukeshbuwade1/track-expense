import { memo, useState, useCallback, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Pagination } from '@/components/common/Pagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ExpenseTable } from '@/components/expenses/ExpenseTable';
import { ExpenseFilters } from '@/components/expenses/ExpenseFilters';
import { ExpenseFormModal } from '@/components/expenses/ExpenseFormModal';
import { useExpenseList, useDeleteExpense } from '@/hooks/useExpenses';
import { useDebounce } from '@/hooks/useDebounce';
import type { Expense, ExpenseFiltersState } from '@/types/expense.types';

const DEFAULT_FILTERS: ExpenseFiltersState = {
  search: '',
  category: '',
  startDate: '',
  endDate: '',
  page: 1,
  limit: 10,
  sortBy: 'date',
  sortOrder: 'desc',
};

const pageHeaderClass = 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6';
const titleClass = 'text-2xl font-bold text-gray-900 dark:text-white';
const subtitleClass = 'text-gray-500 dark:text-gray-400 text-sm mt-1';
const stackClass = 'space-y-4';

const ExpensesPage = () => {
  const [filters, setFilters] = useState<ExpenseFiltersState>(DEFAULT_FILTERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);

  const debouncedSearch = useDebounce(filters.search, 400);

  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  );

  const { data, isLoading } = useExpenseList(queryFilters);
  const deleteMutation = useDeleteExpense();

  const handleFilterChange = useCallback(
    (key: keyof ExpenseFiltersState, value: string | number) =>
      setFilters((prev) => ({ ...prev, [key]: value, page: key !== 'page' ? 1 : Number(value) })),
    [],
  );

  const handleReset = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const handleOpenAdd = useCallback(() => {
    setEditingExpense(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback((expense: Expense) => setDeletingExpense(expense), []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingExpense(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deletingExpense) return;
    deleteMutation.mutate(deletingExpense._id, {
      onSettled: () => setDeletingExpense(null),
    });
  }, [deletingExpense, deleteMutation]);

  const handleCancelDelete = useCallback(() => setDeletingExpense(null), []);
  const handlePageChange = useCallback((page: number) => handleFilterChange('page', page), [handleFilterChange]);

  return (
    <div>
      <div className={pageHeaderClass}>
        <div>
          <h1 className={titleClass}>Expenses</h1>
          <p className={subtitleClass}>{data?.total ?? 0} total expenses</p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={handleOpenAdd}>Add Expense</Button>
      </div>

      <div className={stackClass}>
        <ExpenseFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
        <ExpenseTable
          expenses={data?.expenses ?? []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {data && (
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            total={data.total}
            limit={filters.limit}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <ExpenseFormModal isOpen={isModalOpen} onClose={handleCloseModal} editingExpense={editingExpense} />

      <ConfirmDialog
        isOpen={!!deletingExpense}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Expense"
        message={`Are you sure you want to delete "${deletingExpense?.title}"? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default memo(ExpensesPage);
