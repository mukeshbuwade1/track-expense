import { memo } from 'react';
import { Inbox } from 'lucide-react';
import { ExpenseTableRow } from './ExpenseTableRow';
import { Expense } from '@/types/expense.types';
import { Spinner } from '@/components/common/Spinner';

interface ExpenseTableProps {
  expenses: Expense[];
  isLoading: boolean;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

const wrapperClass = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden';
const tableClass = 'w-full';
const theadClass = 'bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700';
const thClass = 'px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide';
const loadingClass = 'flex items-center justify-center py-16';
const emptyClass = 'flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500';
const emptyTextClass = 'font-medium mt-3';
const emptySubClass = 'text-sm mt-1';

export const ExpenseTable = memo<ExpenseTableProps>(({ expenses, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className={wrapperClass}>
        <div className={loadingClass}><Spinner size="lg" /></div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className={wrapperClass}>
        <div className={emptyClass}>
          <Inbox size={40} strokeWidth={1.5} />
          <p className={emptyTextClass}>No expenses found</p>
          <p className={emptySubClass}>Add your first expense or adjust the filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <div className="overflow-x-auto">
        <table className={tableClass}>
          <thead className={theadClass}>
            <tr>
              <th className={thClass}>Title</th>
              <th className={thClass}>Category</th>
              <th className={thClass}>Amount</th>
              <th className={thClass}>Date</th>
              <th className={thClass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <ExpenseTableRow
                key={expense._id}
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

ExpenseTable.displayName = 'ExpenseTable';
