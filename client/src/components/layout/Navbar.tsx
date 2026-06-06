import { memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, LogOut, Wallet } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store/authStore';
import { useLogout } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

const navClass = 'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40';
const innerClass = 'max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between';
const logoClass = 'font-bold text-xl text-primary-600 dark:text-primary-400 flex items-center gap-2';
const navLinksClass = 'hidden md:flex items-center gap-1';
const actionsClass = 'flex items-center gap-2';
const userClass = 'hidden sm:block text-sm text-gray-600 dark:text-gray-400 font-medium';

const getLinkClass = (active: boolean): string =>
  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
    active
      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
  }`;

export const Navbar = memo(() => {
  const { pathname } = useLocation();
  const { user } = useAuthStore();
  const logout = useLogout();

  const handleLogout = useCallback(() => logout.mutate(), [logout]);

  return (
    <nav className={navClass}>
      <div className={innerClass}>
        <Link to={ROUTES.DASHBOARD} className={logoClass}>
          <Wallet size={22} />
          ExpenseTracker
        </Link>

        <div className={navLinksClass}>
          <Link to={ROUTES.DASHBOARD} className={getLinkClass(pathname === ROUTES.DASHBOARD)}>
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link to={ROUTES.EXPENSES} className={getLinkClass(pathname === ROUTES.EXPENSES)}>
            <Receipt size={16} /> Expenses
          </Link>
        </div>

        <div className={actionsClass}>
          <ThemeToggle />
          {user && <span className={userClass}>Hi, {user.name.split(' ')[0]}</span>}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            isLoading={logout.isPending}
            leftIcon={<LogOut size={15} />}
          >
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
