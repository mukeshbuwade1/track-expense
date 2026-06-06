import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { env } from '../config/env';
import { AppError } from './error.middleware';
import { User } from '../models/User.model';

interface AccessTokenPayload {
  userId: string;
  email: string;
  name: string;
}

export const protect = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Not authorized. No token provided.', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
    const user = await User.findById(decoded.userId).select('_id email name');

    if (!user) {
      return next(new AppError('User not found.', 401));
    }

    req.user = {
      _id: user._id as Types.ObjectId,
      email: user.email,
      name: user.name,
    };

    next();
  } catch {
    next(new AppError('Invalid or expired token.', 401));
  }
};
