import React from 'react';
import { CreateTodoModal } from './CreateTodoModal';
import { EditTodoModal } from './EditTodoModal';
import { CreateTodoRequest, Todo } from '@/types';

interface TodoModalsProps {
  isCreateModalOpen: boolean;
  onCreateTodo: (data: CreateTodoRequest) => Promise<any>;
  onCloseCreateModal: () => void;
  isEditModalOpen: boolean;
  editingTodo: Todo | null | undefined;
  categories: { id: string; name: string }[];
  onCloseEditModal: () => void;
  onUpdateTodo: (id: string, updates: any) => Promise<any>;
}

export const TodoModals = React.memo<TodoModalsProps>(({ 
  isCreateModalOpen,
  onCreateTodo,
  onCloseCreateModal,
  isEditModalOpen,
  editingTodo,
  categories,
  onCloseEditModal,
  onUpdateTodo,
}) => {
  return (
    <>
      <CreateTodoModal
        isOpen={isCreateModalOpen}
        onClose={onCloseCreateModal}
        onCreate={onCreateTodo}
      />
      <EditTodoModal
        isOpen={isEditModalOpen}
        todo={editingTodo || null}
        categories={categories}
        onClose={onCloseEditModal}
        onUpdate={onUpdateTodo}
      />
    </>
  );
});

TodoModals.displayName = 'TodoModals';
