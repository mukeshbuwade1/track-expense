import { memo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { NoAccountModal } from '@/components/common/NoAccountModal';
import { useLogin, isEmailNotFoundError } from '@/hooks/useAuth';
import { loginSchema, LoginFormValues } from '@/utils/validators';
import { ROUTES } from '@/constants/routes';

const pageClass = 'min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4';
const cardClass = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md';
const logoClass = 'text-center mb-8';
const logoIconClass = 'text-4xl mb-2';
const titleClass = 'text-2xl font-bold text-gray-900 dark:text-white';
const subtitleClass = 'text-gray-500 dark:text-gray-400 text-sm mt-1';
const formClass = 'space-y-4';
const footerClass = 'mt-6 text-center text-sm text-gray-500 dark:text-gray-400';
const linkClass = 'text-primary-600 dark:text-primary-400 font-medium hover:underline';

const LoginPage = () => {
  const login = useLogin();
  const [noAccountEmail, setNoAccountEmail] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const handleCloseModal = useCallback(() => setNoAccountEmail(''), []);

  const onSubmit = handleSubmit((data) => {
    login.mutate(data, {
      onError: (err) => {
        if (isEmailNotFoundError(err)) {
          setNoAccountEmail(getValues('email'));
        }
      },
    });
  });

  return (
    <div className={pageClass}>
      <div className={cardClass}>
        <div className={logoClass}>
          <div className={logoIconClass}>💰</div>
          <h1 className={titleClass}>Welcome back</h1>
          <p className={subtitleClass}>Sign in to your ExpenseTracker account</p>
        </div>

        <form className={formClass} onSubmit={onSubmit} noValidate>
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit" className="w-full justify-center" isLoading={login.isPending}>
            Sign in
          </Button>
        </form>

        <p className={footerClass}>
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.REGISTER} className={linkClass}>Create one</Link>
        </p>
      </div>

      <NoAccountModal
        isOpen={!!noAccountEmail}
        email={noAccountEmail}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default memo(LoginPage);
