import { useState, useCallback } from 'react';
import { FilterOptions, TodoCounts, Todo } from '@/types';

const initialFilters: FilterOptions = {
  status: 'all',
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const updateFilter = useCallback(<K extends keyof FilterOptions>(
    key: K, 
    value: FilterOptions[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter('search', e.target.value);
  }, [updateFilter]);

  const handleFilterChange = useCallback((status: 'all' | 'completed' | 'pending') => {
    updateFilter('status', status);
  }, [updateFilter]);

  const handleSortChange = useCallback((sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title') => {
    setFilters(prev => ({ 
      ...prev, 
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handlePriorityFilter = useCallback((priority: string | undefined) => {
    updateFilter('priority', priority as any);
  }, [updateFilter]);

  const handleCategoryFilter = useCallback((categoryId: string | undefined) => {
    updateFilter('categoryId', categoryId);
  }, [updateFilter]);

  const calculateTodoCounts = useCallback((todos: Todo[]): TodoCounts => {
    return {
      all: todos.length,
      pending: todos.filter(t => !t.completed).length,
      completed: todos.filter(t => t.completed).length
    };
  }, []);

  return {
    filters,
    updateFilter,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handlePriorityFilter,
    handleCategoryFilter,
    calculateTodoCounts,
  };
}
