import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Priority } from '@/types';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useCategories } from '@/hooks/useCategories';

const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  categoryId: z.string().min(1, 'Category is required'),
  dueDate: z.string().optional(),
});

type CreateTodoFormData = z.infer<typeof createTodoSchema>;

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateTodoFormData) => void;
}

export const CreateTodoModal: React.FC<CreateTodoModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoFormData>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      categoryId: '',
      dueDate: '',
    },
  });

  const onSubmit = async (data: CreateTodoFormData) => {
    setIsSubmitting(true);
    try {
      await onCreate(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const priorityOptions = [
    { value: 'low', label: 'Low', icon: '⬇️' },
    { value: 'medium', label: 'Medium', icon: '➡️' },
    { value: 'high', label: 'High', icon: '⬆️' },
    { value: 'urgent', label: 'Urgent', icon: '🚨' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Todo"
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="create-todo-form">
        <Input
          label="Title"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Enter todo title"
        />

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full rounded-md border border-secondary-300 px-3 py-2 text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter todo description (optional)"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Priority
          </label>
          <select
            {...register('priority')}
            className="w-full rounded-md border border-secondary-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            name="priority"
            data-testid="priority-select"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Category
          </label>
          <select
            {...register('categoryId')}
            className="w-full rounded-md border border-secondary-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={categoriesLoading}
            name="categoryId"
            data-testid="category-select"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
          )}
        </div>

        <Input
          label="Due Date"
          type="date"
          {...register('dueDate')}
          error={errors.dueDate?.message}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={categoriesLoading}
          >
            Create Todo
          </Button>
        </div>
      </form>
    </Modal>
  );
};
