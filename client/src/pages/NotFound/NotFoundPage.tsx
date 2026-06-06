import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';

const pageClass = 'min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4';
const cardClass = 'text-center max-w-md';
const codeClass = 'text-8xl font-black text-primary-200 dark:text-primary-900 select-none';
const titleClass = 'text-2xl font-bold text-gray-900 dark:text-white mt-4';
const messageClass = 'text-gray-500 dark:text-gray-400 text-sm mt-2 mb-8';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoHome = useCallback(() => navigate(ROUTES.DASHBOARD), [navigate]);

  return (
    <div className={pageClass}>
      <div className={cardClass}>
        <p className={codeClass}>404</p>
        <h1 className={titleClass}>Page not found</h1>
        <p className={messageClass}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Button onClick={handleGoHome} leftIcon={<Home size={16} />}>Go to Dashboard</Button>
      </div>
    </div>
  );
};

export default memo(NotFoundPage);
