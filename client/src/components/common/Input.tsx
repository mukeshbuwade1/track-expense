import React, { memo, forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';
const inputWrapperClass = 'relative';
const leftIconClass = 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400';
const rightIconClass = 'absolute inset-y-0 right-0 pr-3 flex items-center';
const baseInputClass =
  'block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm py-2.5';
const errorInputClass = 'border-red-500 focus:ring-red-500 focus:border-red-500';
const errorTextClass = 'mt-1 text-xs text-red-600 dark:text-red-400';

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(({ label, error, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const pl = leftIcon ? 'pl-10' : 'pl-3';
    const pr = rightIcon ? 'pr-10' : 'pr-3';
    const errorClass = error ? errorInputClass : '';
    const inputClass = `${baseInputClass} ${pl} ${pr} ${errorClass} ${className}`;

    return (
      <div>
        {label && <label htmlFor={inputId} className={labelClass}>{label}</label>}
        <div className={inputWrapperClass}>
          {leftIcon && <div className={leftIconClass}>{leftIcon}</div>}
          <input id={inputId} ref={ref} className={inputClass} {...props} />
          {rightIcon && <div className={rightIconClass}>{rightIcon}</div>}
        </div>
        {error && <p className={errorTextClass}>{error}</p>}
      </div>
    );
  }),
);

Input.displayName = 'Input';
