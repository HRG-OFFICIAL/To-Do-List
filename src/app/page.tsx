'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useTodos } from '@/hooks/useTodos';
import { useCategories } from '@/hooks/useCategories';
import { useFilters } from '@/hooks/useFilters';
import { useTodoOperations } from '@/hooks/useTodoOperations';
import { useAppReducer } from '@/hooks/useAppReducer';
import { TodoTable } from '@/components/TodoTable';
import { TodoHeader } from '@/components/TodoHeader';
import { TodoFilters } from '@/components/TodoFilters';
import { TodoFooter } from '@/components/TodoFooter';
import { TodoModals } from '@/components/TodoModals';
import { TodoPageSkeleton } from '@/components/TodoPageSkeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingSpinner } from '@/components/LoadingSpinner';

function HomePageContent() {
  const { user, logout, isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  
  // Custom hooks for state management
  const { filters, handleSearch, handleFilterChange, handleSortChange, handlePriorityFilter, handleCategoryFilter, calculateTodoCounts } = useFilters();
  const { todos, isLoading: todosLoading, createTodo, updateTodo, deleteTodo, toggleTodo, reorderTodos } = useTodos(filters);
  const { categories } = useCategories();
  const { handleCreateTodo, handleUpdateTodo, handleDeleteTodo, handleToggleTodo, handleReorderTodos } = useTodoOperations({ createTodo, updateTodo, deleteTodo, toggleTodo, reorderTodos });
  const { state, openCreateModal, closeCreateModal } = useAppReducer();

  // Memoized calculations
  const todosCount = useMemo(() => calculateTodoCounts(todos), [todos, calculateTodoCounts]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <TodoPageSkeleton />;
  }

  // Redirect to login if not authenticated (after loading is complete)
  if (!isAuthenticated) {
    return <TodoPageSkeleton />;
  }

  // Show loading while fetching todos
  if (todosLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <LoadingSpinner size="lg" text="Loading your todos..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-200 safe-all">
      <TodoHeader 
        user={user} 
        onLogout={logout} 
      />

      <main className="container-responsive py-responsive flex-1">
        <div className="space-responsive">
          <TodoFilters
            filters={filters}
            todosCount={todosCount}
            categories={categories}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onPriorityFilter={handlePriorityFilter}
            onCategoryFilter={handleCategoryFilter}
            onCreateTodo={openCreateModal}
          />

          <div className="bg-white dark:bg-gray-900 rounded-responsive border-responsive shadow-responsive transition-colors duration-200 overflow-hidden">
            <TodoTable
              todos={todos}
              onToggle={handleToggleTodo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
              onReorder={handleReorderTodos}
            />
          </div>
        </div>
      </main>

      <TodoFooter />

      <TodoModals
        isCreateModalOpen={state.isCreateModalOpen}
        onCreateTodo={handleCreateTodo}
        onCloseCreateModal={closeCreateModal}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <ErrorBoundary>
      <HomePageContent />
    </ErrorBoundary>
  );
}