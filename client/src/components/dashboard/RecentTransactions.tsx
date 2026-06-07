import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { getCategoryMeta } from '@/constants/categories';
import { Expense } from '@/types/expense.types';
import { formatCurrency, formatRelativeDate } from '@/utils/formatters';
import { ROUTES } from '@/constants/routes';

interface RecentTransactionsProps {
  expenses: Expense[];
}

const cardClass = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5';
const headerClass = 'flex items-center justify-between mb-4';
const titleClass = 'text-base font-semibold text-gray-900 dark:text-white';
const linkClass = 'text-sm text-primary-600 dark:text-primary-400 hover:underline';
const rowClass = 'flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-0 gap-3';
const leftClass = 'flex items-center gap-2.5 min-w-0 flex-1';
const iconBoxClass = 'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center';
const nameClass = 'text-sm font-medium text-gray-900 dark:text-white truncate leading-snug';
const dateClass = 'text-xs text-gray-500 dark:text-gray-400 mt-0.5';
const rightClass = 'flex items-center gap-2 flex-shrink-0';
const amountClass = 'text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap tabular-nums';
const emptyClass = 'text-center py-8 text-gray-400 dark:text-gray-500 text-sm';

export const RecentTransactions = memo<RecentTransactionsProps>(({ expenses }) => (
  <div className={cardClass}>
    <div className={headerClass}>
      <p className={titleClass}>Recent Transactions</p>
      <Link to={ROUTES.EXPENSES} className={linkClass}>View all →</Link>
    </div>
    {expenses.length === 0 ? (
      <p className={emptyClass}>No transactions yet</p>
    ) : (
      <div>
        {expenses.slice(0, 5).map((expense) => {
          const { Icon: CategoryIcon, color } = getCategoryMeta(expense.category);
          const iconBoxStyle = { backgroundColor: `${color}18` };
          const iconStyle = { color };
          return (
            <div key={expense._id} className={rowClass}>
              <div className={leftClass}>
                <div className={iconBoxClass} style={iconBoxStyle}>
                  <CategoryIcon size={15} style={iconStyle} />
                </div>
                <div className="min-w-0">
                  <p className={nameClass}>{expense.title}</p>
                  <p className={dateClass}>{formatRelativeDate(expense.date)}</p>
                </div>
              </div>
              <div className={rightClass}>
                <div className="hidden sm:block">
                  <Badge category={expense.category} />
                </div>
                <span className={amountClass}>{formatCurrency(expense.amount)}</span>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
));

RecentTransactions.displayName = 'RecentTransactions';
