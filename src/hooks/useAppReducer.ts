import { useReducer } from 'react';
import { AppState, AppAction } from '@/types';

const initialAppState: AppState = {
  isCreateModalOpen: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'OPEN_CREATE_MODAL':
      return { ...state, isCreateModalOpen: true };
    case 'CLOSE_CREATE_MODAL':
      return { ...state, isCreateModalOpen: false };
    default:
      return state;
  }
}

export function useAppReducer() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const openCreateModal = () => dispatch({ type: 'OPEN_CREATE_MODAL' });
  const closeCreateModal = () => dispatch({ type: 'CLOSE_CREATE_MODAL' });

  return {
    state,
    openCreateModal,
    closeCreateModal,
  };
}
