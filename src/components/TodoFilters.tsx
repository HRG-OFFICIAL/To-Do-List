import React, { useState } from 'react';
import { FilterOptions, TodoCounts, Category, Priority } from '@/types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface TodoFiltersProps {
  filters: FilterOptions;
  todosCount: TodoCounts;
  categories: Category[];
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (status: 'all' | 'completed' | 'pending') => void;
  onSortChange: (sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title') => void;
  onPriorityFilter: (priority: string | undefined) => void;
  onCategoryFilter: (categoryId: string | undefined) => void;
  onCreateTodo: () => void;
}

export const TodoFilters = React.memo<TodoFiltersProps>(({
  filters,
  todosCount,
  categories,
  onSearch,
  onFilterChange,
  onSortChange,
  onPriorityFilter,
  onCategoryFilter,
  onCreateTodo,
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  return (
    <div className="mb-6 sm:mb-8">
      {/* Header with Search and Add */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[hsl(var(--foreground))]">Tasks</h2>
  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-[hsl(var(--muted-foreground))]">
            <span>{todosCount.all} total</span>
            <span>•</span>
            <span>{todosCount.pending} pending</span>
            <span>•</span>
            <span>{todosCount.completed} completed</span>
          </div>
        </div>
        <Button 
          onClick={onCreateTodo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 shadow-sm touch-target w-full sm:w-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New task</span>
        </Button>
      </div>

      {/* Search Bar - Always visible */}
  <div className="bg-white dark:bg-[hsl(var(--card))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-lg p-4 shadow-sm mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Input
            placeholder="Search tasks..."
            value={filters.search || ''}
            onChange={onSearch}
  className="pl-9 w-full bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-[hsl(var(--foreground))] placeholder-gray-500 dark:placeholder-[hsl(var(--muted-foreground))] touch-target"
            title="Search tasks by title or description"
          />
        </div>
      </div>

      {/* Filters - Collapsible on mobile */}
  <div className="bg-white dark:bg-[hsl(var(--card))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-lg shadow-sm">
        {/* Mobile Filter Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between text-left touch-target"
          >
  <span className="text-sm font-medium text-gray-700 dark:text-[hsl(var(--muted-foreground))]">Filters & Sorting</span>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isFiltersExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Filter Content */}
        <div className={`${isFiltersExpanded ? 'block' : 'hidden'} sm:block`}>
          <div className="px-4 pb-4 sm:px-4 sm:py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div className="space-y-1">
  <label className="text-xs font-medium text-gray-700 dark:text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Status
                </label>
                <select
                  value={filters.status || 'all'}
                  onChange={(e) => onFilterChange(e.target.value as any)}
  className="w-full bg-white dark:bg-[hsl(var(--secondary))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-md px-3 py-2 text-sm text-gray-700 dark:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm touch-target"
                  title="Filter tasks by completion status"
                >
  <option value="all" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">All ({todosCount.all})</option>
  <option value="pending" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">Pending ({todosCount.pending})</option>
  <option value="completed" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">Completed ({todosCount.completed})</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div className="space-y-1">
  <label className="text-xs font-medium text-gray-700 dark:text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Sort By
                </label>
                <select
                  value={filters.sortBy || 'createdAt'}
                  onChange={(e) => onSortChange(e.target.value as any)}
  className="w-full bg-white dark:bg-[hsl(var(--secondary))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-md px-3 py-2 text-sm text-gray-700 dark:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm touch-target"
                  title="Sort tasks by different criteria"
                >
  <option value="createdAt" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">Created date</option>
  <option value="dueDate" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">Due date</option>
  <option value="priority" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">Priority</option>
  <option value="title" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">Title</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div className="space-y-1">
  <label className="text-xs font-medium text-gray-700 dark:text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Priority
                </label>
                <select
                  value={filters.priority || ''}
                  onChange={(e) => onPriorityFilter(e.target.value || undefined)}
  className="w-full bg-white dark:bg-[hsl(var(--secondary))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-md px-3 py-2 text-sm text-gray-700 dark:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm touch-target"
                  title="Filter tasks by priority level"
                >
  <option value="" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">All priorities</option>
  <option value="low" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">Low</option>
  <option value="medium" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">Medium</option>
  <option value="high" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">High</option>
  <option value="urgent" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">Urgent</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="space-y-1">
  <label className="text-xs font-medium text-gray-700 dark:text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={filters.categoryId || ''}
                  onChange={(e) => onCategoryFilter(e.target.value || undefined)}
  className="w-full bg-white dark:bg-[hsl(var(--secondary))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-md px-3 py-2 text-sm text-gray-700 dark:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm touch-target"
                  title="Filter tasks by category"
                >
  <option value="" className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">All categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TodoFilters.displayName = 'TodoFilters';
