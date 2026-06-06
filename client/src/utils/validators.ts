import { z } from 'zod';
import { EXPENSE_CATEGORIES } from '@/types/expense.types';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const expenseSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be under 200 characters'),
  amount: z
    .number({ error: 'Amount must be a number' })
    .min(0.01, 'Amount must be greater than ₹0'),
  category: z.enum(EXPENSE_CATEGORIES, { message: 'Please select a category' }),
  date: z.string().min(1, 'Date is required'),
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ExpenseFormValues = z.infer<typeof expenseSchema>;
