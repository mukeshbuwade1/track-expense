import { memo, useCallback } from 'react';
import { Modal } from '@/components/common/Modal';
import { ExpenseForm } from './ExpenseForm';
import { Expense } from '@/types/expense.types';
import { ExpenseFormValues } from '@/utils/validators';
import { useCreateExpense, useUpdateExpense } from '@/hooks/useExpenses';

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingExpense?: Expense | null;
  onCreated?: () => void;
}

export const ExpenseFormModal = memo<ExpenseFormModalProps>(({ isOpen, onClose, editingExpense, onCreated }) => {
  const createMutation = useCreateExpense();
  const updateMutation = useUpdateExpense();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = useCallback(
    (data: ExpenseFormValues) => {
      if (editingExpense) {
        updateMutation.mutate(
          { id: editingExpense._id, payload: data },
          { onSuccess: onClose },
        );
      } else {
        createMutation.mutate(data, {
          onSuccess: () => {
            onClose();
            onCreated?.();
          },
        });
      }
    },
    [editingExpense, createMutation, updateMutation, onClose, onCreated],
  );

  const title = editingExpense ? 'Edit Expense' : 'Add Expense';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <ExpenseForm
        initialData={editingExpense ?? undefined}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={isLoading}
      />
    </Modal>
  );
});

ExpenseFormModal.displayName = 'ExpenseFormModal';
