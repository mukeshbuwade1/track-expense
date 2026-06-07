import { memo, useState, useCallback, useEffect, ChangeEvent } from 'react';
import { Modal } from '@/components/common/Modal';
import { Select } from '@/components/common/Select';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { CATEGORY_META } from '@/constants/categories';
import { ExpenseFiltersState, ExpenseCategory } from '@/types/expense.types';

type FilterDraft = Pick<ExpenseFiltersState, 'category' | 'startDate' | 'endDate'>;

interface FilterDrawerProps {
  isOpen: boolean;
  filters: ExpenseFiltersState;
  onClose: () => void;
  onApply: (draft: FilterDraft) => void;
  onReset: () => void;
}

const categoryOptions = CATEGORY_META.map((c) => ({ value: c.value, label: `${c.emoji}  ${c.label}` }));

const fieldClass = 'space-y-4';
const actionsClass = 'flex gap-3 mt-6';
const resetClass = 'text-xs text-primary-600 dark:text-primary-400 hover:underline mt-4 text-center w-full';

export const FilterDrawer = memo<FilterDrawerProps>(({ isOpen, filters, onClose, onApply, onReset }) => {
  const [draft, setDraft] = useState<FilterDraft>({
    category: filters.category,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  useEffect(() => {
    if (isOpen) {
      setDraft({
        category: filters.category,
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
    }
  }, [isOpen, filters.category, filters.startDate, filters.endDate]);

  const handleCategory = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) =>
      setDraft((prev) => ({ ...prev, category: e.target.value as ExpenseCategory | '' })),
    [],
  );

  const handleStartDate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setDraft((prev) => ({ ...prev, startDate: e.target.value })),
    [],
  );

  const handleEndDate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setDraft((prev) => ({ ...prev, endDate: e.target.value })),
    [],
  );

  const handleApply = useCallback(() => {
    onApply(draft);
    onClose();
  }, [draft, onApply, onClose]);

  const handleReset = useCallback(() => {
    setDraft({ category: '', startDate: '', endDate: '' });
    onReset();
    onClose();
  }, [onReset, onClose]);

  const hasDraftFilters = draft.category || draft.startDate || draft.endDate;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Expenses" maxWidth="max-w-sm">
      <div className={fieldClass}>
        <Select
          label="Category"
          options={categoryOptions}
          value={draft.category}
          onChange={handleCategory}
          placeholder="All categories"
        />
        <Input
          label="From date"
          type="date"
          value={draft.startDate}
          onChange={handleStartDate}
        />
        <Input
          label="To date"
          type="date"
          value={draft.endDate}
          onChange={handleEndDate}
        />
      </div>

      {hasDraftFilters && (
        <button className={resetClass} onClick={handleReset}>
          Clear all filters
        </button>
      )}

      <div className={actionsClass}>
        <Button variant="secondary" className="flex-1 justify-center" onClick={onClose}>
          Cancel
        </Button>
        <Button className="flex-1 justify-center" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </Modal>
  );
});

FilterDrawer.displayName = 'FilterDrawer';
