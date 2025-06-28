import React, { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import { CircularProgress } from '@mui/material';
import ThemeToggle from './components/common/ThemeToggle';

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <ThemeToggle />
      <Suspense
        fallback={
          <div className="flex justify-center items-center mt-20">
            <CircularProgress />
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    </div>
  );
};

export default App;