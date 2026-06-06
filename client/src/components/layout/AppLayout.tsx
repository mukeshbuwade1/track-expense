import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

const wrapperClass = 'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors';
const mainClass = 'max-w-7xl mx-auto px-4 sm:px-6 py-8';

export const AppLayout = memo(() => (
  <div className={wrapperClass}>
    <Navbar />
    <main className={mainClass}>
      <Outlet />
    </main>
  </div>
));

AppLayout.displayName = 'AppLayout';
