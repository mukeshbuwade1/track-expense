import React, { memo } from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-4',
};

const baseClass = 'animate-spin rounded-full border-primary-600 border-t-transparent';

export const Spinner = memo<SpinnerProps>(({ size = 'md', className = '' }) => {
  const sizeClass = sizeMap[size];
  return <div className={`${baseClass} ${sizeClass} ${className}`} role="status" aria-label="Loading" />;
});

Spinner.displayName = 'Spinner';
