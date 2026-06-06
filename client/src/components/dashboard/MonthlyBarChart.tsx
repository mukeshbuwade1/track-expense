import { memo, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyTrend } from '@/types/dashboard.types';
import { formatMonthYear, formatCurrency } from '@/utils/formatters';

interface MonthlyBarChartProps {
  data: MonthlyTrend[];
}

const cardClass = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5';
const titleClass = 'text-base font-semibold text-gray-900 dark:text-white mb-4';

const tooltipStyle = {
  backgroundColor: '#1f2937',
  border: 'none',
  borderRadius: '8px',
  color: '#f9fafb',
};

const formatAxisAmount = (value: number): string => {
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return `₹${value}`;
};

export const MonthlyBarChart = memo<MonthlyBarChartProps>(({ data }) => {
  const chartData = useMemo(
    () => data.map((d) => ({ name: formatMonthYear(d.year, d.month), total: d.total })),
    [data],
  );

  const tooltipFormatter = useMemo(
    () => (value: number | string | readonly (string | number)[] | undefined) => {
      const num = Array.isArray(value) ? Number(value[0] ?? 0) : Number(value ?? 0);
      return [formatCurrency(num), 'Total'] as [string, string];
    },
    [],
  );

  if (data.length === 0) {
    return (
      <div className={cardClass}>
        <p className={titleClass}>Monthly Spending</p>
        <div className="flex items-center justify-center h-40 text-gray-400 dark:text-gray-500 text-sm">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <p className={titleClass}>Monthly Spending (Last 12 months)</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
          <YAxis tickFormatter={formatAxisAmount} tick={{ fontSize: 11, fill: '#9ca3af' }} width={55} />
          <Tooltip contentStyle={tooltipStyle} formatter={tooltipFormatter} />
          <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

MonthlyBarChart.displayName = 'MonthlyBarChart';
