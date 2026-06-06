import { memo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const containerClass = 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4';
const infoClass = 'text-sm text-gray-500 dark:text-gray-400';
const navClass = 'flex items-center gap-2';
const pageInfoClass = 'text-sm text-gray-700 dark:text-gray-300 px-2';

export const Pagination = memo<PaginationProps>(({ page, totalPages, total, limit, onPageChange }) => {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const handlePrev = useCallback(() => onPageChange(page - 1), [onPageChange, page]);
  const handleNext = useCallback(() => onPageChange(page + 1), [onPageChange, page]);

  if (totalPages <= 1) return null;

  return (
    <div className={containerClass}>
      <p className={infoClass}>Showing {start}–{end} of {total}</p>
      <div className={navClass}>
        <Button variant="secondary" size="sm" onClick={handlePrev} disabled={page <= 1} leftIcon={<ChevronLeft size={15} />}>
          Prev
        </Button>
        <span className={pageInfoClass}>{page} / {totalPages}</span>
        <Button variant="secondary" size="sm" onClick={handleNext} disabled={page >= totalPages}>
          Next <ChevronRight size={15} />
        </Button>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';
