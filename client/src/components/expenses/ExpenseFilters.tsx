import { memo, useCallback, useState, useMemo, ChangeEvent } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { FilterDrawer } from './FilterDrawer';
import { CATEGORY_META } from '@/constants/categories';
import { ExpenseFiltersState, ExpenseCategory } from '@/types/expense.types';

interface ExpenseFiltersProps {
  filters: ExpenseFiltersState;
  onFilterChange: (key: keyof ExpenseFiltersState, value: string | number) => void;
  onReset: () => void;
}

type FilterDraft = Pick<ExpenseFiltersState, 'category' | 'startDate' | 'endDate'>;

const desktopClass = 'hidden sm:block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4';
const desktopGridClass = 'grid grid-cols-2 lg:grid-cols-4 gap-3';
const desktopActionsClass = 'flex justify-end mt-3 gap-2';

const mobileClass = 'flex items-center gap-2 sm:hidden';
const mobileSearchWrapperClass = 'flex-1 min-w-0';
const filterBtnWrapperClass = 'relative flex-shrink-0';
const badgeClass = 'absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center pointer-events-none';

const categoryOptions = CATEGORY_META.map((c) => ({ value: c.value, label: c.label }));

export const ExpenseFilters = memo<ExpenseFiltersProps>(({ filters, onFilterChange, onReset }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const handleApply = useCallback((draft: FilterDraft) => {
    onFilterChange('category', draft.category);
    onFilterChange('startDate', draft.startDate);
    onFilterChange('endDate', draft.endDate);
  }, [onFilterChange]);

  const activeFilterCount = useMemo(
    () => [filters.category, filters.startDate, filters.endDate].filter(Boolean).length,
    [filters.category, filters.startDate, filters.endDate],
  );

  const hasActiveFilters = activeFilterCount > 0 || !!filters.search;

  return (
    <>
      {/* Mobile: search + filter button */}
      <div className={mobileClass}>
        <div className={mobileSearchWrapperClass}>
          <Input
            placeholder="Search expenses..."
            value={filters.search}
            onChange={handleSearch}
            leftIcon={<Search size={15} />}
          />
        </div>
        <div className={filterBtnWrapperClass}>
          <Button variant="secondary" size="sm" onClick={openDrawer} leftIcon={<SlidersHorizontal size={15} />} />
          {activeFilterCount > 0 && (
            <span className={badgeClass}>{activeFilterCount}</span>
          )}
        </div>
      </div>

      {/* Desktop: full 4-col grid */}
      <div className={desktopClass}>
        <div className={desktopGridClass}>
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
            value={filters.startDate}
            onChange={handleStartDate}
          />
          <Input
            type="date"
            value={filters.endDate}
            onChange={handleEndDate}
          />
        </div>
        {hasActiveFilters && (
          <div className={desktopActionsClass}>
            <Button variant="ghost" size="sm" onClick={onReset}>Clear filters</Button>
          </div>
        )}
      </div>

      <FilterDrawer
        isOpen={isDrawerOpen}
        filters={filters}
        onClose={closeDrawer}
        onApply={handleApply}
        onReset={onReset}
      />
    </>
  );
});

ExpenseFilters.displayName = 'ExpenseFilters';
