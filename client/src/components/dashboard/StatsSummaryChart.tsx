import { memo, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DashboardSummary } from '@/types/dashboard.types';
import { formatCurrency } from '@/utils/formatters';

interface StatsSummaryChartProps {
  summary: DashboardSummary;
}

const cardClass = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 flex flex-col';
const titleClass = 'text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2';
const chartWrapperClass = 'relative flex-1';
const centerLabelClass = 'absolute inset-0 flex flex-col items-center justify-center pointer-events-none';
const totalLabelClass = 'text-xs font-bold text-gray-900 dark:text-white leading-tight text-center';
const totalSubClass = 'text-[10px] text-gray-400 dark:text-gray-500 mt-0.5';
const legendClass = 'mt-2 space-y-1';
const legendRowClass = 'flex items-center justify-between text-[11px]';
const legendDotClass = 'w-2 h-2 rounded-full mr-1.5 flex-shrink-0';
const legendNameClass = 'flex items-center text-gray-500 dark:text-gray-400';
const legendValueClass = 'font-medium text-gray-800 dark:text-gray-200 tabular-nums';

const COLORS = {
  thisMonth: '#3b82f6',
  lastMonth: '#8b5cf6',
  other: '#e5e7eb',
};

const tooltipStyle = {
  backgroundColor: '#1f2937',
  border: 'none',
  borderRadius: '8px',
  color: '#f9fafb',
  fontSize: '11px',
  padding: '6px 10px',
};

const tooltipFormatter = (value: number | string | readonly (string | number)[] | undefined) => {
  const num = Array.isArray(value) ? Number(value[0] ?? 0) : Number(value ?? 0);
  return [formatCurrency(num), ''] as [string, string];
};

export const StatsSummaryChart = memo<StatsSummaryChartProps>(({ summary }) => {
  const { totalExpenses, thisMonthTotal, lastMonthTotal } = summary;

  const other = Math.max(0, totalExpenses - thisMonthTotal - lastMonthTotal);

  const chartData = useMemo(() => {
    const segments = [
      { name: 'This Month', value: thisMonthTotal, color: COLORS.thisMonth },
      { name: 'Last Month', value: lastMonthTotal, color: COLORS.lastMonth },
    ];
    if (other > 0) segments.push({ name: 'Previous', value: other, color: COLORS.other });
    const hasData = segments.some((s) => s.value > 0);
    if (!hasData) return [{ name: 'No data', value: 1, color: COLORS.other }];
    return segments.filter((s) => s.value > 0);
  }, [thisMonthTotal, lastMonthTotal, other]);

  const totalLabel = useMemo(() => {
    if (totalExpenses >= 100000) return `₹${(totalExpenses / 100000).toFixed(1)}L`;
    if (totalExpenses >= 1000) return `₹${(totalExpenses / 1000).toFixed(1)}k`;
    return `₹${totalExpenses.toFixed(0)}`;
  }, [totalExpenses]);

  return (
    <div className={cardClass}>
      <p className={titleClass}>Overview</p>
      <div className={chartWrapperClass} style={{ height: 120 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={38}
              outerRadius={55}
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
        <div className={centerLabelClass}>
          <span className={totalLabelClass}>{totalLabel}</span>
          <span className={totalSubClass}>total</span>
        </div>
      </div>
      <div className={legendClass}>
        <div className={legendRowClass}>
          <span className={legendNameClass}>
            <span className={legendDotClass} style={{ backgroundColor: COLORS.thisMonth }} />
            This mo.
          </span>
          <span className={legendValueClass}>{formatCurrency(thisMonthTotal)}</span>
        </div>
        <div className={legendRowClass}>
          <span className={legendNameClass}>
            <span className={legendDotClass} style={{ backgroundColor: COLORS.lastMonth }} />
            Last mo.
          </span>
          <span className={legendValueClass}>{formatCurrency(lastMonthTotal)}</span>
        </div>
      </div>
    </div>
  );
});

StatsSummaryChart.displayName = 'StatsSummaryChart';
