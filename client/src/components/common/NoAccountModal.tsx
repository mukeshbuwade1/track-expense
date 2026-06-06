import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserX } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { ROUTES } from '@/constants/routes';

interface NoAccountModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
}

const iconWrapperClass = 'flex justify-center mb-3';
const iconCircleClass = 'w-14 h-14 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500';
const messageClass = 'text-gray-600 dark:text-gray-400 text-sm mb-1 text-center';
const emailClass = 'font-semibold text-gray-900 dark:text-white';
const hintClass = 'text-gray-500 dark:text-gray-500 text-sm mt-2 mb-6 text-center';
const actionsClass = 'flex flex-col sm:flex-row gap-3';

export const NoAccountModal = memo<NoAccountModalProps>(({ isOpen, email, onClose }) => {
  const navigate = useNavigate();

  const handleSignUp = useCallback(() => {
    onClose();
    navigate(ROUTES.REGISTER, { state: { email } });
  }, [onClose, navigate, email]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Account not found" maxWidth="max-w-sm">
      <div className={iconWrapperClass}>
        <div className={iconCircleClass}>
          <UserX size={26} />
        </div>
      </div>
      <p className={messageClass}>
        No account exists for <span className={emailClass}>{email}</span>
      </p>
      <p className={hintClass}>
        Would you like to create a free account and start tracking your expenses?
      </p>
      <div className={actionsClass}>
        <Button variant="secondary" className="flex-1 justify-center" onClick={onClose}>
          Close
        </Button>
        <Button className="flex-1 justify-center" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </Modal>
  );
});

NoAccountModal.displayName = 'NoAccountModal';
