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
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200 safe-top">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center touch-target-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                Tasks
              </h1>
            </div>
          </div>
          
          {/* Right side - Theme switcher and User info */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeSwitcher />
            
            {/* Mobile: Show only avatar and dropdown, Desktop: Show full user info */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* User Avatar */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-600 touch-target-sm">
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.name?.charAt(0)}
                </span>
              </div>
              
              {/* User name - hidden on mobile, visible on tablet+ */}
              <span className="hidden sm:inline-block text-sm text-gray-700 dark:text-gray-200 font-medium">
                {user?.name}
              </span>
              
              {/* Sign out button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200 touch-target-sm px-2 sm:px-3"
                title="Sign out"
              >
                <span className="hidden sm:inline">Sign out</span>
                <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

TodoHeader.displayName = 'TodoHeader';
