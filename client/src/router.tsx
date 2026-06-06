import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ScreenErrorBoundary } from '@/boundaries/ScreenErrorBoundary';
import { Spinner } from '@/components/common/Spinner';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const ExpensesPage = lazy(() => import('@/pages/Expenses/ExpensesPage'));
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/Auth/RegisterPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'));

const fullPageSpinner = (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <Spinner size="lg" />
  </div>
);

const withBoundary = (element: React.ReactNode) => (
  <ScreenErrorBoundary>
    <Suspense fallback={fullPageSpinner}>{element}</Suspense>
  </ScreenErrorBoundary>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return <>{children}</>;
};

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.LOGIN,
    element: withBoundary(<GuestRoute><LoginPage /></GuestRoute>),
  },
  {
    path: ROUTES.REGISTER,
    element: withBoundary(<GuestRoute><RegisterPage /></GuestRoute>),
  },
  {
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: withBoundary(<DashboardPage />),
      },
      {
        path: ROUTES.EXPENSES,
        element: withBoundary(<ExpensesPage />),
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: withBoundary(<NotFoundPage />),
  },
]);
