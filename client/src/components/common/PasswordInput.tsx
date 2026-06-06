import { memo, forwardRef, useState, useCallback, InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './Input';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const toggleButtonClass =
  'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none p-0.5 rounded';

export const PasswordInput = memo(
  forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
    const [visible, setVisible] = useState(false);

    const handleToggle = useCallback(() => setVisible((v) => !v), []);

    const eyeButton = (
      <button
        type="button"
        className={toggleButtonClass}
        onClick={handleToggle}
        tabIndex={-1}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    );

    return (
      <Input
        {...props}
        ref={ref}
        type={visible ? 'text' : 'password'}
        rightIcon={eyeButton}
      />
    );
  }),
);

PasswordInput.displayName = 'PasswordInput';
