import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '@/types';

export function useCategories() {
  const queryClient = useQueryClient();

  const {
    data: categories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: apiClient.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (renamed from cacheTime in v5)
  });

  const createCategoryMutation = useMutation({
    mutationFn: apiClient.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateCategoryRequest }) =>
      apiClient.updateCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: apiClient.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // Also invalidate todos since they depend on categories
    },
  });

  const createCategory = async (categoryData: CreateCategoryRequest) => {
    try {
      const newCategory = await createCategoryMutation.mutateAsync(categoryData);
      return { success: true, data: newCategory };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create category',
      };
    }
  };

  const updateCategory = async (id: string, updates: UpdateCategoryRequest) => {
    try {
      const updatedCategory = await updateCategoryMutation.mutateAsync({ id, updates });
      return { success: true, data: updatedCategory };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update category',
      };
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(id);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete category',
      };
    }
  };

  return {
    categories,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch,
    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
  };
}
