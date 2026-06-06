import { memo, ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const cardClass = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5';
const headerClass = 'flex items-center justify-between mb-3';
const iconWrapperClass = 'w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400';
const titleClass = 'text-sm font-medium text-gray-500 dark:text-gray-400';
const valueClass = 'text-2xl font-bold text-gray-900 dark:text-white';
const trendRowClass = 'flex items-center gap-1 mt-1';
const subtitleClass = 'text-xs text-gray-500 dark:text-gray-400';

const trendColorMap = {
  up: 'text-green-600 dark:text-green-400',
  down: 'text-red-500 dark:text-red-400',
  neutral: 'text-gray-500 dark:text-gray-400',
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  if (trend === 'up') return <TrendingUp size={13} />;
  if (trend === 'down') return <TrendingDown size={13} />;
  return <Minus size={13} />;
};

export const StatCard = memo<StatCardProps>(({ title, value, icon, subtitle, trend, trendValue }) => (
  <div className={cardClass}>
    <div className={headerClass}>
      <p className={titleClass}>{title}</p>
      <div className={iconWrapperClass}>{icon}</div>
    </div>
    <p className={valueClass}>{value}</p>
    {(subtitle || trend) && (
      <div className={trendRowClass}>
        {trend && trendValue && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColorMap[trend]}`}>
            <TrendIcon trend={trend} />
            {trendValue}
          </span>
        )}
        {subtitle && <span className={subtitleClass}>{subtitle}</span>}
      </div>
    )}
  </div>
));

StatCard.displayName = 'StatCard';
