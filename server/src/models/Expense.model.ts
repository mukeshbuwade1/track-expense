import { Schema, model, Document, Types } from 'mongoose';

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Health',
  'Shopping',
  'Education',
  'Other',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface IExpense extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    amount: { type: Number, required: true, min: 0.01 },
    category: { type: String, enum: EXPENSE_CATEGORIES, required: true },
    date: { type: Date, required: true, index: true },
    description: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true },
);

expenseSchema.index({ userId: 1, date: -1 });
expenseSchema.index({ userId: 1, category: 1 });

export const Expense = model<IExpense>('Expense', expenseSchema);
