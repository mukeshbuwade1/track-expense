import { Request, Response, NextFunction } from 'express';
import {
  listExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
  ExpenseListQuery,
} from '../services/expense.service';
import { ExpenseCategory } from '../models/Expense.model';

export const getExpenses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!._id.toString();
    const query: ExpenseListQuery = {
      page: Math.max(1, Number(req.query.page) || 1),
      limit: Math.min(100, Math.max(1, Number(req.query.limit) || 10)),
      search: req.query.search as string | undefined,
      category: req.query.category as ExpenseCategory | undefined,
      startDate: req.query.startDate as string | undefined,
      endDate: req.query.endDate as string | undefined,
      sortBy: (req.query.sortBy as string) || 'date',
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };
    const result = await listExpenses(userId, query);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const addExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!._id.toString();
    const expense = await createExpense(userId, req.body);
    res.status(201).json({ success: true, data: { expense } });
  } catch (err) {
    next(err);
  }
};

export const getExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params['id']);
    const expense = await getExpenseById(id, req.user!._id.toString());
    res.json({ success: true, data: { expense } });
  } catch (err) {
    next(err);
  }
};

export const editExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params['id']);
    const expense = await updateExpense(id, req.user!._id.toString(), req.body);
    res.json({ success: true, data: { expense } });
  } catch (err) {
    next(err);
  }
};

export const removeExpense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params['id']);
    await deleteExpense(id, req.user!._id.toString());
    res.json({ success: true, message: 'Expense deleted' });
  } catch (err) {
    next(err);
  }
};
