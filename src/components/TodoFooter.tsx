import React from 'react';

export const TodoFooter = React.memo(() => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200 safe-bottom">
      <div className="container-responsive py-4">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
            Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
});

TodoFooter.displayName = 'TodoFooter';
