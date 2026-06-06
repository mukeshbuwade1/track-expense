import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { expenseSchema, ExpenseFormValues } from '@/utils/validators';
import { Expense } from '@/types/expense.types';
import { CATEGORY_META } from '@/constants/categories';
import { toInputDateValue } from '@/utils/formatters';

interface ExpenseFormProps {
  initialData?: Expense;
  onSubmit: (data: ExpenseFormValues) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const formClass = 'space-y-4';
const actionsClass = 'flex justify-end gap-3 pt-2';

const categoryOptions = CATEGORY_META.map((c) => ({ value: c.value, label: `${c.emoji}  ${c.label}` }));

export const ExpenseForm = memo<ExpenseFormProps>(({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          amount: initialData.amount,
          category: initialData.category,
          date: toInputDateValue(initialData.date),
          description: initialData.description ?? '',
        }
      : { date: toInputDateValue(new Date().toISOString()) },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        amount: initialData.amount,
        category: initialData.category,
        date: toInputDateValue(initialData.date),
        description: initialData.description ?? '',
      });
    }
  }, [initialData, reset]);

  const amountRegister = register('amount', { valueAsNumber: true });

  return (
    <form className={formClass} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input label="Title" placeholder="e.g. Coffee at Starbucks" error={errors.title?.message} {...register('title')} />
      <Input label="Amount (₹)" type="number" step="0.01" min="0.01" placeholder="0.00" error={errors.amount?.message} {...amountRegister} />
      <Select label="Category" options={categoryOptions} placeholder="Select category" error={errors.category?.message} {...register('category')} />
      <Input label="Date" type="date" error={errors.date?.message} {...register('date')} />
      <Input label="Description (optional)" placeholder="Optional notes..." error={errors.description?.message} {...register('description')} />
      <div className={actionsClass}>
        <Button variant="secondary" type="button" onClick={onCancel} disabled={isLoading}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{initialData ? 'Update' : 'Add'} Expense</Button>
      </div>
    </form>
  );
});

ExpenseForm.displayName = 'ExpenseForm';
