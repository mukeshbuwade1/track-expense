import React, { memo } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  isLoading?: boolean;
}

const messageClass = 'text-gray-600 dark:text-gray-400 text-sm mb-6';
const actionsClass = 'flex justify-end gap-3';

export const ConfirmDialog = memo<ConfirmDialogProps>(({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Delete',
  isLoading = false,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
    <p className={messageClass}>{message}</p>
    <div className={actionsClass}>
      <Button variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>{confirmLabel}</Button>
    </div>
  </Modal>
));

ConfirmDialog.displayName = 'ConfirmDialog';
