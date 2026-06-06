import { memo, ReactNode, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

const overlayClass = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm';
const containerClass = 'bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full overflow-hidden';
const headerClass = 'flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700';
const titleClass = 'text-lg font-semibold text-gray-900 dark:text-white';
const closeButtonClass = 'p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors';
const bodyClass = 'p-5';

export const Modal = memo<ModalProps>(({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  const stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className={overlayClass} onClick={onClose}>
      <div className={`${containerClass} ${maxWidth}`} onClick={stopPropagation}>
        <div className={headerClass}>
          <h2 className={titleClass}>{title}</h2>
          <button className={closeButtonClass} onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        <div className={bodyClass}>{children}</div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';
