import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const TodoPageSkeleton = React.memo(() => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <LoadingSpinner size="lg" text="Loading your todos..." />
    </div>
  );
});

TodoPageSkeleton.displayName = 'TodoPageSkeleton';
