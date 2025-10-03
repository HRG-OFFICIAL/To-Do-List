import { useCallback } from 'react';
import { CreateTodoRequest, UpdateTodoRequest } from '@/types';
import toast from 'react-hot-toast';

interface TodoOperations {
  createTodo: (data: CreateTodoRequest) => Promise<{ success: boolean; error?: string }>;
  updateTodo: (id: string, updates: UpdateTodoRequest) => Promise<{ success: boolean; error?: string }>;
  deleteTodo: (id: string) => Promise<{ success: boolean; error?: string }>;
  toggleTodo: (id: string, completed: boolean) => Promise<{ success: boolean; error?: string }>;
  reorderTodos: (todoIds: string[]) => Promise<{ success: boolean; error?: string }>;
}

export function useTodoOperations(todoOperations: TodoOperations) {
  const { createTodo, updateTodo, deleteTodo, toggleTodo, reorderTodos } = todoOperations;

  const handleCreateTodo = useCallback(async (data: CreateTodoRequest) => {
    const result = await createTodo(data);
    if (result.success) {
      toast.success('Todo created successfully!');
    } else {
      toast.error(result.error || 'Failed to create todo');
    }
    return result;
  }, [createTodo]);

  const handleUpdateTodo = useCallback(async (id: string, updates: UpdateTodoRequest) => {
    const result = await updateTodo(id, updates);
    if (result.success) {
      toast.success('Todo updated successfully!');
    } else {
      toast.error(result.error || 'Failed to update todo');
    }
    return result;
  }, [updateTodo]);

  const handleDeleteTodo = useCallback(async (id: string) => {
    const result = await deleteTodo(id);
    if (result.success) {
      toast.success('Todo deleted successfully!');
    } else {
      toast.error(result.error || 'Failed to delete todo');
    }
    return result;
  }, [deleteTodo]);

  const handleToggleTodo = useCallback(async (id: string, completed: boolean) => {
    const result = await toggleTodo(id, completed);
    if (result.success) {
      toast.success(completed ? 'Todo completed!' : 'Todo marked as pending');
    } else {
      toast.error(result.error || 'Failed to update todo');
    }
    return result;
  }, [toggleTodo]);

  const handleReorderTodos = useCallback(async (todoIds: string[]) => {
    const result = await reorderTodos(todoIds);
    if (result.success) {
      toast.success('Todos reordered successfully!');
    } else {
      toast.error(result.error || 'Failed to reorder todos');
    }
    return result;
  }, [reorderTodos]);

  return {
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleReorderTodos,
  };
}
