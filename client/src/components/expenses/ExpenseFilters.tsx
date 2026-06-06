import { memo, useCallback, ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { CATEGORY_META } from '@/constants/categories';
import { ExpenseFiltersState, ExpenseCategory } from '@/types/expense.types';

interface ExpenseFiltersProps {
  filters: ExpenseFiltersState;
  onFilterChange: (key: keyof ExpenseFiltersState, value: string | number) => void;
  onReset: () => void;
}

const containerClass = 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4';
const gridClass = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3';
const actionsClass = 'flex justify-end mt-3 gap-2';

const categoryOptions = [
  ...CATEGORY_META.map((c) => ({ value: c.value, label: c.label })),
];

export const ExpenseFilters = memo<ExpenseFiltersProps>(({ filters, onFilterChange, onReset }) => {
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onFilterChange('search', e.target.value),
    [onFilterChange],
  );

  const handleCategory = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => onFilterChange('category', e.target.value as ExpenseCategory | ''),
    [onFilterChange],
  );

  const handleStartDate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onFilterChange('startDate', e.target.value),
    [onFilterChange],
  );

  const handleEndDate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onFilterChange('endDate', e.target.value),
    [onFilterChange],
  );

  const hasActiveFilters = filters.search || filters.category || filters.startDate || filters.endDate;

  return (
    <div className={containerClass}>
      <div className={gridClass}>
        <Input
          placeholder="Search expenses..."
          value={filters.search}
          onChange={handleSearch}
          leftIcon={<Search size={15} />}
        />
        <Select
          options={categoryOptions}
          value={filters.category}
          onChange={handleCategory}
          placeholder="All categories"
        />
        <Input
          type="date"
          label=""
          placeholder="Start date"
          value={filters.startDate}
          onChange={handleStartDate}
        />
        <Input
          type="date"
          label=""
          placeholder="End date"
          value={filters.endDate}
          onChange={handleEndDate}
        />
      </div>
      {hasActiveFilters && (
        <div className={actionsClass}>
          <Button variant="ghost" size="sm" onClick={onReset}>Clear filters</Button>
        </div>
      )}
    </div>
  );
});

ExpenseFilters.displayName = 'ExpenseFilters';
