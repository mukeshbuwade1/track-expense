import { Types } from 'mongoose';
import { Expense, IExpense, ExpenseCategory } from '../models/Expense.model';
import { AppError } from '../middleware/error.middleware';

export interface ExpenseListQuery {
  page: number;
  limit: number;
  search?: string;
  category?: ExpenseCategory;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedExpenses {
  expenses: IExpense[];
  total: number;
  page: number;
  totalPages: number;
}

export const listExpenses = async (userId: string, query: ExpenseListQuery): Promise<PaginatedExpenses> => {
  const { page, limit, search, category, startDate, endDate, sortBy = 'date', sortOrder = 'desc' } = query;

  const filter: Record<string, unknown> = { userId: new Types.ObjectId(userId) };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (category) filter.category = category;

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) (filter.date as Record<string, Date>).$gte = new Date(startDate);
    if (endDate) (filter.date as Record<string, Date>).$lte = new Date(endDate);
  }

  const sortDirection = sortOrder === 'asc' ? 1 : -1;
  const sort: Record<string, 1 | -1> = { [sortBy]: sortDirection };

  const skip = (page - 1) * limit;
  const [expenses, total] = await Promise.all([
    Expense.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Expense.countDocuments(filter),
  ]);

  return { expenses: expenses as unknown as IExpense[], total, page, totalPages: Math.ceil(total / limit) };
};

export const createExpense = async (userId: string, data: Partial<IExpense>): Promise<IExpense> => {
  const expense = await Expense.create({ ...data, userId: new Types.ObjectId(userId) });
  return expense;
};

export const getExpenseById = async (id: string, userId: string): Promise<IExpense> => {
  const expense = await Expense.findOne({ _id: id, userId });
  if (!expense) throw new AppError('Expense not found', 404);
  return expense;
};

export const updateExpense = async (id: string, userId: string, data: Partial<IExpense>): Promise<IExpense> => {
  const expense = await Expense.findOneAndUpdate(
    { _id: id, userId },
    { $set: data },
    { new: true, runValidators: true },
  );
  if (!expense) throw new AppError('Expense not found', 404);
  return expense;
};

export const deleteExpense = async (id: string, userId: string): Promise<void> => {
  const result = await Expense.findOneAndDelete({ _id: id, userId });
  if (!result) throw new AppError('Expense not found', 404);
};
