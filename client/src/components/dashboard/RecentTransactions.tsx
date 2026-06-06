import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/common/Badge';
import { Expense } from '@/types/expense.types';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { ROUTES } from '@/constants/routes';

interface RecentTransactionsProps {
  expenses: Expense[];
}

const cardClass = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5';
const headerClass = 'flex items-center justify-between mb-4';
const titleClass = 'text-base font-semibold text-gray-900 dark:text-white';
const linkClass = 'text-sm text-primary-600 dark:text-primary-400 hover:underline';
const rowClass = 'flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-gray-700 last:border-0';
const leftClass = 'flex items-center gap-3 min-w-0';
const nameClass = 'text-sm font-medium text-gray-900 dark:text-white truncate';
const dateClass = 'text-xs text-gray-500 dark:text-gray-400 mt-0.5';
const amountClass = 'text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap ml-3 tabular-nums';
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
        {expenses.slice(0, 5).map((expense) => (
          <div key={expense._id} className={rowClass}>
            <div className={leftClass}>
              <div>
                <p className={nameClass}>{expense.title}</p>
                <p className={dateClass}>{formatDate(expense.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge category={expense.category} />
              <span className={amountClass}>{formatCurrency(expense.amount)}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
));

RecentTransactions.displayName = 'RecentTransactions';
