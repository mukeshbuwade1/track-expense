import { Types } from 'mongoose';
import { Expense } from '../models/Expense.model';

export interface CategoryBreakdown {
  category: string;
  total: number;
  count: number;
}

export interface MonthlyTrend {
  year: number;
  month: number;
  total: number;
  count: number;
}

export interface DashboardSummary {
  totalExpenses: number;
  totalCount: number;
  thisMonthTotal: number;
  lastMonthTotal: number;
  categoryBreakdown: CategoryBreakdown[];
  monthlyTrend: MonthlyTrend[];
}

export const getDashboardSummary = async (userId: string): Promise<DashboardSummary> => {
  const userObjectId = new Types.ObjectId(userId);
  const now = new Date();
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  const [totalResult, thisMonthResult, lastMonthResult, categoryResult, monthlyResult] = await Promise.all([
    Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]),
    Expense.aggregate([
      { $match: { userId: userObjectId, date: { $gte: startOfThisMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Expense.aggregate([
      { $match: { userId: userObjectId, date: { $gte: startOfLastMonth, $lte: endOfLastMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $project: { category: '$_id', total: 1, count: 1, _id: 0 } },
      { $sort: { total: -1 } },
    ]),
    Expense.aggregate([
      { $match: { userId: userObjectId, date: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $project: { year: '$_id.year', month: '$_id.month', total: 1, count: 1, _id: 0 } },
      { $sort: { year: 1, month: 1 } },
    ]),
  ]);

  return {
    totalExpenses: totalResult[0]?.total ?? 0,
    totalCount: totalResult[0]?.count ?? 0,
    thisMonthTotal: thisMonthResult[0]?.total ?? 0,
    lastMonthTotal: lastMonthResult[0]?.total ?? 0,
    categoryBreakdown: categoryResult as CategoryBreakdown[],
    monthlyTrend: monthlyResult as MonthlyTrend[],
  };
};
