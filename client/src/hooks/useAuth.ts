import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { queryKeys } from '@/constants/queryKeys';
import { ROUTES } from '@/constants/routes';
import { LoginPayload, RegisterPayload } from '@/types/auth.types';
import { AxiosError } from 'axios';
import { AUTH_ERRORS } from '@/constants/authErrors';

export const extractErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) return err.response?.data?.message ?? err.message;
  return 'Something went wrong';
};

export const isEmailNotFoundError = (err: unknown): boolean => {
  if (err instanceof AxiosError) {
    return err.response?.data?.message === AUTH_ERRORS.EMAIL_NOT_FOUND;
  }
  return false;
};

export const useGetMe = () => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: authService.getMe,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate(ROUTES.DASHBOARD);
    },
    onError: (err) => {
      if (!isEmailNotFoundError(err)) {
        toast.error(extractErrorMessage(err));
      }
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
    },
  });
};
