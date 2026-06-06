import { memo } from 'react';
import { getCategoryMeta } from '@/constants/categories';

interface BadgeProps {
  category: string;
}

const badgeClass = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium';

export const Badge = memo<BadgeProps>(({ category }) => {
  const { Icon, label, color } = getCategoryMeta(category);
  const style = { backgroundColor: `${color}20`, color };

  return (
    <span className={badgeClass} style={style}>
      <Icon size={12} strokeWidth={2.5} />
      {label}
    </span>
  );
});

Badge.displayName = 'Badge';
