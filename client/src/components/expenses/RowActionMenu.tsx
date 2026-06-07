import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

interface RowActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

interface MenuPosition {
  top: number;
  right: number;
}

const triggerClass = 'p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors';
const menuClass = 'fixed w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 py-1 overflow-hidden';
const menuItemClass = 'flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors';
const deleteItemClass = 'flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors';
const backdropClass = 'fixed inset-0 z-40';

export const RowActionMenu = memo<RowActionMenuProps>(({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<MenuPosition>({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    }
    setIsOpen((v) => !v);
  }, [isOpen]);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleEdit = useCallback(() => {
    setIsOpen(false);
    onEdit();
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    setIsOpen(false);
    onDelete();
  }, [onDelete]);

  useEffect(() => {
    if (!isOpen) return;
    const onScroll = () => setIsOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  const menuStyle = { top: menuPos.top, right: menuPos.right };

  return (
    <div className="flex justify-center">
      <button ref={buttonRef} className={triggerClass} onClick={handleToggle} aria-label="Actions">
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <>
          <div className={backdropClass} onClick={handleClose} />
          <div className={menuClass} style={menuStyle}>
            <button className={menuItemClass} onClick={handleEdit}>
              <Pencil size={14} /> Edit
            </button>
            <button className={deleteItemClass} onClick={handleDelete}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
});

RowActionMenu.displayName = 'RowActionMenu';
