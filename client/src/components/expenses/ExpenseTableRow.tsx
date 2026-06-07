import { memo, useCallback } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { RowActionMenu } from './RowActionMenu';
import { getCategoryMeta } from '@/constants/categories';
import { Expense } from '@/types/expense.types';
import { formatCurrency, formatDate, formatRelativeDate } from '@/utils/formatters';

interface ExpenseTableRowProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

const rowClass = 'border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors';
const cellClass = 'px-4 py-3 text-sm';
const titleRowClass = 'flex items-center gap-2.5';
const iconBoxClass = 'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center';
const titleClass = 'font-medium text-gray-900 dark:text-white leading-snug';
const descClass = 'text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1';
const mobileDateClass = 'sm:hidden text-xs text-gray-400 dark:text-gray-500 mt-0.5';
const categoryLabelClass = 'text-gray-600 dark:text-gray-400';
const amountClass = 'font-semibold text-gray-900 dark:text-white tabular-nums';
const amountDateClass = 'sm:hidden text-xs text-gray-400 dark:text-gray-500 mt-0.5 tabular-nums';
const dateClass = 'text-gray-500 dark:text-gray-400';
const desktopActionsClass = 'hidden sm:flex items-center gap-1';

export const ExpenseTableRow = memo<ExpenseTableRowProps>(({ expense, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => onEdit(expense), [onEdit, expense]);
  const handleDelete = useCallback(() => onDelete(expense), [onDelete, expense]);

  const { Icon: CategoryIcon, color, label } = getCategoryMeta(expense.category);
  const iconBoxStyle = { backgroundColor: `${color}18` };
  const iconStyle = { color };

  return (
    <tr className={rowClass}>
      {/* Title — always visible; includes category icon + mobile date */}
      <td className={cellClass}>
        <div className={titleRowClass}>
          <div className={iconBoxClass} style={iconBoxStyle}>
            <CategoryIcon size={15} style={iconStyle} />
          </div>
          <div className="min-w-0">
            <p className={titleClass}>{expense.title}</p>
            {expense.description && <p className={descClass}>{expense.description}</p>}
          </div>
        </div>
      </td>

      {/* Category — text only, desktop only */}
      <td className={`${cellClass} ${categoryLabelClass} hidden lg:table-cell`}>
        {label}
      </td>

      {/* Amount — always visible; date shown below on mobile */}
      <td className={cellClass}>
        <p className={amountClass}>{formatCurrency(expense.amount)}</p>
        <p className={amountDateClass}>{formatRelativeDate(expense.date)}</p>
      </td>

      {/* Date — tablet + desktop only */}
      <td className={`${cellClass} ${dateClass} hidden sm:table-cell`}>
        {formatDate(expense.date)}
      </td>

      {/* Actions — desktop: icon buttons; mobile: 3-dot menu */}
      <td className="px-2 sm:px-4 py-3 text-sm w-px whitespace-nowrap text-center">
        <div className={desktopActionsClass}>
          <Button variant="ghost" size="sm" onClick={handleEdit} title="Edit" leftIcon={<Pencil size={15} />} />
          <Button variant="ghost" size="sm" onClick={handleDelete} title="Delete" leftIcon={<Trash2 size={15} className="text-red-500" />} />
        </div>
        <div className="sm:hidden">
          <RowActionMenu onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </td>
    </tr>
  );
});

ExpenseTableRow.displayName = 'ExpenseTableRow';
