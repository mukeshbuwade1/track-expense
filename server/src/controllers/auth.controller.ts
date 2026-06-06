import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, refreshAccessToken } from '../services/auth.service';
import { User } from '../models/User.model';
import { AppError } from '../middleware/error.middleware';
import { env } from '../config/env';

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const { user, tokens } = await registerUser(name, email, password);
    res.cookie('refreshToken', tokens.refreshToken, REFRESH_COOKIE_OPTIONS);
    res.status(201).json({
      success: true,
      data: { user, accessToken: tokens.accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await loginUser(email, password);
    res.cookie('refreshToken', tokens.refreshToken, REFRESH_COOKIE_OPTIONS);
    res.json({
      success: true,
      data: { user, accessToken: tokens.accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (_req: Request, res: Response): void => {
  res.clearCookie('refreshToken', { path: '/' });
  res.json({ success: true, message: 'Logged out successfully' });
};

export const refresh = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies?.refreshToken as string | undefined;
    if (!token) {
      next(new AppError('No refresh token', 401));
      return;
    }
    const accessToken = refreshAccessToken(token);
    res.json({ success: true, data: { accessToken } });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    if (!user) {
      next(new AppError('User not found', 404));
      return;
    }
    res.json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};
