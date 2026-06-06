import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { env } from '../config/env';
import { User, IUser } from '../models/User.model';
import { AppError } from '../middleware/error.middleware';

interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

const signAccessToken = (payload: TokenPayload): string =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as jwt.SignOptions);

const signRefreshToken = (payload: TokenPayload): string =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as jwt.SignOptions);

const buildTokenPair = (user: IUser): AuthTokens => {
  const payload: TokenPayload = {
    userId: (user._id as Types.ObjectId).toString(),
    email: user.email,
    name: user.name,
  };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<{ user: IUser; tokens: AuthTokens }> => {
  const existing = await User.findOne({ email });
  if (existing) throw new AppError('Email already in use', 409);
  const user = await User.create({ name, email, password });
  const tokens = buildTokenPair(user);
  return { user, tokens };
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ user: IUser; tokens: AuthTokens }> => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new AppError('No account found with this email', 404);
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError('Incorrect password', 401);
  const tokens = buildTokenPair(user);
  return { user, tokens };
};

export const refreshAccessToken = (refreshToken: string): string => {
  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as TokenPayload;
    return signAccessToken({ userId: decoded.userId, email: decoded.email, name: decoded.name });
  } catch {
    throw new AppError('Invalid or expired refresh token', 401);
  }
};
