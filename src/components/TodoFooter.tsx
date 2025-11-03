import React from 'react';

export const TodoFooter = React.memo(() => {
  return (
  <footer className="bg-white dark:bg-[hsl(var(--card))] border-t border-gray-200 dark:border-[hsl(var(--border))] transition-colors duration-200 safe-bottom">
      <div className="container-responsive py-4">
        <div className="text-center">
    <p className="text-xs sm:text-sm text-gray-600 dark:text-[hsl(var(--muted-foreground))] transition-colors duration-200">
            Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
});

TodoFooter.displayName = 'TodoFooter';
