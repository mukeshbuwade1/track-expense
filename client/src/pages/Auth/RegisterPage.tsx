import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@/components/common/Input';
import { PasswordInput } from '@/components/common/PasswordInput';
import { Button } from '@/components/common/Button';
import { useRegister } from '@/hooks/useAuth';
import { registerSchema, RegisterFormValues } from '@/utils/validators';
import { ROUTES } from '@/constants/routes';

interface LocationState {
  email?: string;
}

const pageClass = 'min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4';
const cardClass = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md';
const logoClass = 'text-center mb-8';
const logoIconClass = 'text-4xl mb-2';
const titleClass = 'text-2xl font-bold text-gray-900 dark:text-white';
const subtitleClass = 'text-gray-500 dark:text-gray-400 text-sm mt-1';
const formClass = 'space-y-4';
const footerClass = 'mt-6 text-center text-sm text-gray-500 dark:text-gray-400';
const linkClass = 'text-primary-600 dark:text-primary-400 font-medium hover:underline';

const RegisterPage = () => {
  const registerMutation = useRegister();
  const location = useLocation();
  const prefillEmail = (location.state as LocationState)?.email ?? '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: prefillEmail },
  });

  const onSubmit = handleSubmit(({ name, email, password }) =>
    registerMutation.mutate({ name, email, password }),
  );

  return (
    <div className={pageClass}>
      <div className={cardClass}>
        <div className={logoClass}>
          <div className={logoIconClass}>💰</div>
          <h1 className={titleClass}>Create account</h1>
          <p className={subtitleClass}>
            {prefillEmail
              ? `Creating account for ${prefillEmail}`
              : 'Start tracking your expenses today'}
          </p>
        </div>

        <form className={formClass} onSubmit={onSubmit} noValidate>
          <Input
            label="Full name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordInput
            label="Confirm password"
            placeholder="Repeat password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" className="w-full justify-center" isLoading={registerMutation.isPending}>
            Create account
          </Button>
        </form>

        <p className={footerClass}>
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className={linkClass}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default memo(RegisterPage);
