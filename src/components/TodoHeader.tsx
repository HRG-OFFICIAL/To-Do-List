import React from 'react';
import { User } from '@/types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './ui/Button';

interface TodoHeaderProps {
  user: User | null;
  onLogout: () => Promise<void>;
}

export const TodoHeader = React.memo<TodoHeaderProps>(({ 
  user, 
  onLogout
}) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                Tasks
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-600">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                {user?.name}
              </span>
              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

TodoHeader.displayName = 'TodoHeader';
