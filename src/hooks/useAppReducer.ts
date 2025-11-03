import { useReducer } from 'react';
import { AppState, AppAction } from '@/types';

const initialAppState: AppState = {
  isCreateModalOpen: false,
  isEditModalOpen: false,
  editingTodo: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'OPEN_CREATE_MODAL':
      return { ...state, isCreateModalOpen: true };
    case 'CLOSE_CREATE_MODAL':
      return { ...state, isCreateModalOpen: false };
    case 'OPEN_EDIT_MODAL':
      return { ...state, isEditModalOpen: true, editingTodo: action.payload.todo };
    case 'CLOSE_EDIT_MODAL':
      return { ...state, isEditModalOpen: false, editingTodo: null };
    default:
      return state;
  }
}

export function useAppReducer() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const openCreateModal = () => dispatch({ type: 'OPEN_CREATE_MODAL' });
  const closeCreateModal = () => dispatch({ type: 'CLOSE_CREATE_MODAL' });
  const openEditModal = (todo: any) => dispatch({ type: 'OPEN_EDIT_MODAL', payload: { todo } });
  const closeEditModal = () => dispatch({ type: 'CLOSE_EDIT_MODAL' });

  return {
    state,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
  };
}
