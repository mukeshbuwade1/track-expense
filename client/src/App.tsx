import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { router } from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const toasterOptions = {
  duration: 3000,
  style: { borderRadius: '10px', background: '#333', color: '#fff' },
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster position="top-right" toastOptions={toasterOptions} />
  </QueryClientProvider>
);

export default App;
