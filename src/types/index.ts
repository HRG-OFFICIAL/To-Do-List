export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Category {
  id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  priority: Priority;
  categoryId: string;
  dueDate?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  priority?: Priority;
  categoryId?: string;
  dueDate?: string;
  completed?: boolean;
  order?: number;
}

export interface CreateCategoryRequest {
  name: string;
  color: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  color?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOptions {
  status?: 'all' | 'completed' | 'pending';
  priority?: Priority;
  categoryId?: string;
  search?: string;
  sortBy?: 'createdAt' | 'dueDate' | 'priority' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface Theme {
  name: string;
  value: string;
  label: string;
}

export interface TodoCounts {
  all: number;
  pending: number;
  completed: number;
}

export interface AppState {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  editingTodo?: Todo | null;
}

export type AppAction = 
  | { type: 'OPEN_CREATE_MODAL' }
  | { type: 'CLOSE_CREATE_MODAL' }
  | { type: 'OPEN_EDIT_MODAL'; payload: { todo: Todo } }
  | { type: 'CLOSE_EDIT_MODAL' };