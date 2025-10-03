import { AuthResponse, LoginRequest, RegisterRequest, Todo, CreateTodoRequest, UpdateTodoRequest, Category, CreateCategoryRequest, UpdateCategoryRequest, FilterOptions, PaginatedResponse } from '@/types';
import { mockAuth, mockTodos, mockCategories } from './mockApi';

class ApiClient {
  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { user, token } = await mockAuth.login(credentials.email, credentials.password);
    return { user, token };
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const { user, token } = await mockAuth.register(userData);
    return { user, token };
  }

  async logout(): Promise<void> {
    await mockAuth.logout();
  }

  async getCurrentUser(): Promise<AuthResponse['user']> {
    return await mockAuth.getCurrentUser();
  }

  // Todo endpoints
  async getTodos(filters?: FilterOptions): Promise<PaginatedResponse<Todo>> {
    return await mockTodos.getTodos(filters);
  }

  async getTodo(id: string): Promise<Todo> {
    return await mockTodos.getTodo(id);
  }

  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    return await mockTodos.createTodo(todo);
  }

  async updateTodo(id: string, updates: UpdateTodoRequest): Promise<Todo> {
    return await mockTodos.updateTodo(id, updates);
  }

  async deleteTodo(id: string): Promise<void> {
    await mockTodos.deleteTodo(id);
  }

  async reorderTodos(todoIds: string[]): Promise<void> {
    await mockTodos.reorderTodos(todoIds);
  }

  // Category endpoints
  async getCategories(): Promise<Category[]> {
    return await mockCategories.getCategories();
  }

  async createCategory(category: CreateCategoryRequest): Promise<Category> {
    return await mockCategories.createCategory(category);
  }

  async updateCategory(id: string, updates: UpdateCategoryRequest): Promise<Category> {
    return await mockCategories.updateCategory(id, updates);
  }

  async deleteCategory(id: string): Promise<void> {
    await mockCategories.deleteCategory(id);
  }
}

export const apiClient = new ApiClient();
