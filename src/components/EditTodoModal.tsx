import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Priority, Todo } from '@/types';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

const editTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  categoryId: z.string().min(1, 'Category is required'),
  dueDate: z.string().optional(),
});

type EditTodoFormData = z.infer<typeof editTodoSchema>;

interface EditTodoModalProps {
  isOpen: boolean;
  todo: Todo | null | undefined;
  categories: { id: string; name: string }[];
  onClose: () => void;
  onUpdate: (id: string, updates: EditTodoFormData) => Promise<any>;
}

export const EditTodoModal: React.FC<EditTodoModalProps> = ({ isOpen, todo, categories, onClose, onUpdate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: EditTodoFormData = {
    title: todo?.title || '',
    description: todo?.description || '',
    priority: (todo?.priority || 'medium') as Priority,
    categoryId: todo?.category?.id || '',
    dueDate: todo?.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 10) : '',
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditTodoFormData>({
    resolver: zodResolver(editTodoSchema),
    defaultValues,
  });

  useEffect(() => {
    // Reset form when todo changes or modal opens
    if (isOpen) {
      reset(defaultValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, todo?.id]);

  const onSubmit = async (data: EditTodoFormData) => {
    if (!todo) return;
    setIsSubmitting(true);
    try {
      await onUpdate(todo.id, data);
      reset(defaultValues);
      onClose();
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset(defaultValues);
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
      title="Edit Todo"
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="edit-todo-form">
        <Input
          label="Title"
          {...register('title')}
          error={errors.title?.message}
          placeholder="Update todo title"
        />

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full rounded-md border border-secondary-300 px-3 py-2 text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Update description (optional)"
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
            className="w-full bg-white dark:bg-[hsl(var(--secondary))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-md px-3 py-2 text-sm text-gray-700 dark:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer shadow-sm"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">
                {option.label}
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
            className="w-full bg-white dark:bg-[hsl(var(--secondary))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-md px-3 py-2 text-sm text-gray-700 dark:text-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer shadow-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id} className="bg-white dark:bg-[hsl(var(--secondary))] text-gray-900 dark:text-[hsl(var(--foreground))]">
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
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoModal;