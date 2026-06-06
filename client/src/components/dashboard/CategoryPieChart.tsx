import { memo, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CategoryBreakdown } from '@/types/dashboard.types';
import { getCategoryMeta } from '@/constants/categories';
import { formatCurrency } from '@/utils/formatters';

interface CategoryPieChartProps {
  data: CategoryBreakdown[];
  compact?: boolean;
}

const cardClass = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5';
const compactCardClass = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3';
const titleClass = 'text-base font-semibold text-gray-900 dark:text-white mb-4';
const compactTitleClass = 'text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2';
const emptyClass = 'flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm';

const tooltipStyle = {
  backgroundColor: '#1f2937',
  border: 'none',
  borderRadius: '8px',
  color: '#f9fafb',
  fontSize: '11px',
  padding: '6px 10px',
};

const legendStyle = { fontSize: '12px' };

export const CategoryPieChart = memo<CategoryPieChartProps>(({ data, compact = false }) => {
  const chartData = useMemo(
    () => data.map((d) => ({ name: d.category, value: d.total, color: getCategoryMeta(d.category).color })),
    [data],
  );

  const tooltipFormatter = useMemo(
    () => (value: number | string | readonly (string | number)[] | undefined) => {
      const num = Array.isArray(value) ? Number(value[0] ?? 0) : Number(value ?? 0);
      return [formatCurrency(num), 'Amount'] as [string, string];
    },
    [],
  );

  if (compact) {
    return (
      <div className={compactCardClass}>
        <p className={compactTitleClass}>By Category</p>
        {data.length === 0 ? (
          <div className={emptyClass} style={{ height: 120 }}>No data</div>
        ) : (
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={52}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={tooltipFormatter} />
            </PieChart>
          </ResponsiveContainer>
        )}
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {chartData.slice(0, 4).map((entry) => (
            <span key={entry.name} className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <p className={titleClass}>Spending by Category</p>
      {data.length === 0 ? (
        <div className={emptyClass} style={{ height: 160 }}>No data available</div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} formatter={tooltipFormatter} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={legendStyle} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});

CategoryPieChart.displayName = 'CategoryPieChart';
