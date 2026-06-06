import React, { memo, forwardRef, SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';
const baseSelectClass =
  'block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm px-3 py-2.5';
const errorSelectClass = 'border-red-500 focus:ring-red-500';
const errorTextClass = 'mt-1 text-xs text-red-600 dark:text-red-400';

export const Select = memo(
  forwardRef<HTMLSelectElement, SelectProps>(({ label, error, options, placeholder, id, className = '', ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const errorClass = error ? errorSelectClass : '';
    const selectClass = `${baseSelectClass} ${errorClass} ${className}`;

    return (
      <div>
        {label && <label htmlFor={selectId} className={labelClass}>{label}</label>}
        <select id={selectId} ref={ref} className={selectClass} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className={errorTextClass}>{error}</p>}
      </div>
    );
  }),
);

Select.displayName = 'Select';
