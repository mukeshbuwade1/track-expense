import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackPath?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const containerClass = 'min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6';
const cardClass = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center';
const iconWrapperClass = 'flex justify-center mb-4';
const iconCircleClass = 'w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500';
const titleClass = 'text-2xl font-bold text-gray-900 dark:text-white mb-2';
const messageClass = 'text-gray-500 dark:text-gray-400 mb-6 text-sm';
const errorBoxClass = 'bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-6 text-left';
const errorTextClass = 'text-red-600 dark:text-red-400 text-xs font-mono break-all';
const buttonClass =
  'inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors';

export class ScreenErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ScreenErrorBoundary caught:', error, info.componentStack);
  }

  handleGoHome = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.href = this.props.fallbackPath ?? '/';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={containerClass}>
          <div className={cardClass}>
            <div className={iconWrapperClass}>
              <div className={iconCircleClass}>
                <AlertTriangle size={30} />
              </div>
            </div>
            <h1 className={titleClass}>Something went wrong</h1>
            <p className={messageClass}>An unexpected error occurred. Please try navigating back to the home page.</p>
            {this.state.error && (
              <div className={errorBoxClass}>
                <p className={errorTextClass}>{this.state.error.message}</p>
              </div>
            )}
            <button className={buttonClass} onClick={this.handleGoHome}>
              <Home size={16} /> Go Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
