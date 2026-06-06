import { memo, useCallback } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Expense } from '@/types/expense.types';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface ExpenseTableRowProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

const rowClass = 'border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors';
const cellClass = 'px-4 py-3 text-sm';
const titleClass = 'font-medium text-gray-900 dark:text-white';
const descClass = 'text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1';
const amountClass = 'font-semibold text-gray-900 dark:text-white tabular-nums';
const dateClass = 'text-gray-500 dark:text-gray-400';
const actionsClass = 'flex items-center gap-1';

export const ExpenseTableRow = memo<ExpenseTableRowProps>(({ expense, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => onEdit(expense), [onEdit, expense]);
  const handleDelete = useCallback(() => onDelete(expense), [onDelete, expense]);

  return (
    <tr className={rowClass}>
      <td className={cellClass}>
        <p className={titleClass}>{expense.title}</p>
        {expense.description && <p className={descClass}>{expense.description}</p>}
      </td>
      <td className={cellClass}>
        <Badge category={expense.category} />
      </td>
      <td className={`${cellClass} ${amountClass}`}>
        {formatCurrency(expense.amount)}
      </td>
      <td className={`${cellClass} ${dateClass}`}>
        {formatDate(expense.date)}
      </td>
      <td className={cellClass}>
        <div className={actionsClass}>
          <Button variant="ghost" size="sm" onClick={handleEdit} title="Edit" leftIcon={<Pencil size={15} />} />
          <Button variant="ghost" size="sm" onClick={handleDelete} title="Delete" leftIcon={<Trash2 size={15} className="text-red-500" />} />
        </div>
      </td>
    </tr>
  );
});

ExpenseTableRow.displayName = 'ExpenseTableRow';
