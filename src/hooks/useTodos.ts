import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Todo, CreateTodoRequest, UpdateTodoRequest, FilterOptions } from '@/types';

export function useTodos(filters?: FilterOptions) {
  const queryClient = useQueryClient();

  const {
    data: todosData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['todos', filters],
    queryFn: () => apiClient.getTodos(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
    enabled: true, // Always enabled for now
  });

  const createTodoMutation = useMutation({
    mutationFn: apiClient.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateTodoRequest }) =>
      apiClient.updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: apiClient.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const reorderTodosMutation = useMutation({
    mutationFn: apiClient.reorderTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const createTodo = useCallback(
    async (todoData: CreateTodoRequest) => {
      try {
        const newTodo = await createTodoMutation.mutateAsync(todoData);
        return { success: true, data: newTodo };
      } catch (error: any) {
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to create todo',
        };
      }
    },
    [createTodoMutation]
  );

  const updateTodo = useCallback(
    async (id: string, updates: UpdateTodoRequest) => {
      try {
        const updatedTodo = await updateTodoMutation.mutateAsync({ id, updates });
        return { success: true, data: updatedTodo };
      } catch (error: any) {
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to update todo',
        };
      }
    },
    [updateTodoMutation]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      try {
        await deleteTodoMutation.mutateAsync(id);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to delete todo',
        };
      }
    },
    [deleteTodoMutation]
  );

  const toggleTodo = useCallback(
    async (id: string, completed: boolean) => {
      return updateTodo(id, { completed });
    },
    [updateTodo]
  );

  const reorderTodos = useCallback(
    async (todoIds: string[]) => {
      try {
        await reorderTodosMutation.mutateAsync(todoIds);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to reorder todos',
        };
      }
    },
    [reorderTodosMutation]
  );

  return {
    todos: todosData?.data || [],
    pagination: todosData?.pagination,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    reorderTodos,
    refetch,
    isCreating: createTodoMutation.isPending,
    isUpdating: updateTodoMutation.isPending,
    isDeleting: deleteTodoMutation.isPending,
    isReordering: reorderTodosMutation.isPending,
  };
}
