import React from 'react';
import { CreateTodoModal } from './CreateTodoModal';
import { CreateTodoRequest } from '@/types';

interface TodoModalsProps {
  isCreateModalOpen: boolean;
  onCreateTodo: (data: CreateTodoRequest) => Promise<any>;
  onCloseCreateModal: () => void;
}

export const TodoModals = React.memo<TodoModalsProps>(({
  isCreateModalOpen,
  onCreateTodo,
  onCloseCreateModal,
}) => {
  return (
    <CreateTodoModal
      isOpen={isCreateModalOpen}
      onClose={onCloseCreateModal}
      onCreate={onCreateTodo}
    />
  );
});

TodoModals.displayName = 'TodoModals';
