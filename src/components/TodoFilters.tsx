import React from 'react';
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
  return (
    <div className="mb-8">
      {/* Notion-style Header with Search and Add */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tasks</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{todosCount.all} total</span>
            <span>•</span>
            <span>{todosCount.pending} pending</span>
            <span>•</span>
            <span>{todosCount.completed} completed</span>
          </div>
        </div>
        <Button 
          onClick={onCreateTodo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New task</span>
        </Button>
      </div>

      {/* Notion-style Filter Bar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Input
              placeholder="Search tasks..."
              value={filters.search || ''}
              onChange={onSearch}
              className="pl-9 w-full bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              title="Search tasks by title or description"
            />
          </div>

          {/* Filter Divider */}
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1 group relative">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12M8 10h8M10 14h4" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-400">Filter by:</span>
            <select
              value={filters.status || 'all'}
              onChange={(e) => onFilterChange(e.target.value as any)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1 pr-8 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm min-w-[120px]"
              title="Filter tasks by completion status"
            >
              <option value="all" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All ({todosCount.all})</option>
              <option value="pending" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Pending ({todosCount.pending})</option>
              <option value="completed" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Completed ({todosCount.completed})</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center space-x-1 group relative">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-400">Sort by:</span>
            <select
              value={filters.sortBy || 'createdAt'}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1 pr-8 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm min-w-[140px]"
              title="Sort tasks by different criteria"
            >
              <option value="createdAt" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Created date</option>
              <option value="dueDate" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Due date</option>
              <option value="priority" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Priority</option>
              <option value="title" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Title</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center space-x-1 group relative">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-400">Priority:</span>
            <select
              value={filters.priority || ''}
              onChange={(e) => onPriorityFilter(e.target.value || undefined)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1 pr-8 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm min-w-[130px]"
              title="Filter tasks by priority level"
            >
              <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All priorities</option>
              <option value="low" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Low</option>
              <option value="medium" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Medium</option>
              <option value="high" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">High</option>
              <option value="urgent" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Urgent</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-1 group relative">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-400">Category:</span>
            <select
              value={filters.categoryId || ''}
              onChange={(e) => onCategoryFilter(e.target.value || undefined)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1 pr-8 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer shadow-sm min-w-[140px]"
              title="Filter tasks by category"
            >
              <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">All categories</option>
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
  );
});

TodoFilters.displayName = 'TodoFilters';
