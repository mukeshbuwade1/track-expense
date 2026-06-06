import {
  Utensils,
  Car,
  House,
  Clapperboard,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Package,
  type LucideIcon,
} from 'lucide-react';
import { ExpenseCategory } from '@/types/expense.types';

export interface CategoryMeta {
  value: ExpenseCategory;
  label: string;
  color: string;
  Icon: LucideIcon;
  emoji: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  { value: 'Food',          label: 'Food & Dining',  color: '#f97316', Icon: Utensils,      emoji: '🍔' },
  { value: 'Transport',     label: 'Transport',       color: '#3b82f6', Icon: Car,           emoji: '🚗' },
  { value: 'Housing',       label: 'Housing',         color: '#8b5cf6', Icon: House,         emoji: '🏠' },
  { value: 'Entertainment', label: 'Entertainment',   color: '#ec4899', Icon: Clapperboard,  emoji: '🎬' },
  { value: 'Health',        label: 'Health',          color: '#10b981', Icon: HeartPulse,    emoji: '💊' },
  { value: 'Shopping',      label: 'Shopping',        color: '#f59e0b', Icon: ShoppingBag,   emoji: '🛍️' },
  { value: 'Education',     label: 'Education',       color: '#06b6d4', Icon: GraduationCap, emoji: '📚' },
  { value: 'Other',         label: 'Other',           color: '#6b7280', Icon: Package,       emoji: '📦' },
];

export const getCategoryMeta = (category: string): CategoryMeta =>
  CATEGORY_META.find((c) => c.value === category) ?? CATEGORY_META[CATEGORY_META.length - 1]!;
