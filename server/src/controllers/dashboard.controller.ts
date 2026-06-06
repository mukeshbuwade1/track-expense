import { Request, Response, NextFunction } from 'express';
import { getDashboardSummary } from '../services/dashboard.service';

export const getSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const summary = await getDashboardSummary(req.user!._id.toString());
    res.json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
};
