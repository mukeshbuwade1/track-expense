import axiosInstance from './axiosInstance';
import type { ApiResponse } from '@/types/api.types';
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types/auth.types';

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', payload);
    return data.data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', payload);
    return data.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout');
  },

  getMe: async (): Promise<User> => {
    const { data } = await axiosInstance.get<ApiResponse<{ user: User }>>('/auth/me');
    return data.data.user;
  },

  refresh: async (): Promise<string> => {
    const { data } = await axiosInstance.post<ApiResponse<{ accessToken: string }>>('/auth/refresh');
    return data.data.accessToken;
  },
};
