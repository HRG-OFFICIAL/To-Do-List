import { User, Todo, Category, CreateTodoRequest, UpdateTodoRequest, CreateCategoryRequest, UpdateCategoryRequest, FilterOptions, Priority } from '@/types';
import { generateId } from './utils';

// Mock data storage
const users: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Guest User',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  }
];

let todos: Todo[] = [
  {
    id: '1',
    title: '🚀 Launch new product feature',
    description: 'Deploy the user dashboard redesign to production and monitor performance metrics',
    completed: false,
    priority: 'urgent',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    category: {
      id: '2',
      name: 'Work',
      color: '#10b981',
      userId: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    userId: '1',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    order: 0,
  },
  {
    id: '2',
    title: '📚 Read "Atomic Habits"',
    description: 'Finish chapters 5-8 and take notes on habit stacking techniques',
    completed: true,
    priority: 'medium',
    category: {
      id: '3',
      name: 'Personal',
      color: '#f59e0b',
      userId: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    userId: '1',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    order: 1,
  },
  {
    id: '3',
    title: '💡 Plan team offsite event',
    description: 'Research venues, create agenda, and coordinate with HR for Q2 team building',
    completed: false,
    priority: 'high',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    category: {
      id: '2',
      name: 'Work',
      color: '#10b981',
      userId: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    userId: '1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    order: 2,
  },
  {
    id: '4',
    title: '🏃‍♂️ Complete 5K training run',
    description: 'Run 3 miles at moderate pace, focus on maintaining steady breathing',
    completed: false,
    priority: 'low',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    category: {
      id: '4',
      name: 'Health',
      color: '#ef4444',
      userId: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    userId: '1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    order: 3,
  },
  {
    id: '5',
    title: '🎨 Design new logo concepts',
    description: 'Create 3 different logo variations for the rebrand project',
    completed: false,
    priority: 'medium',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    category: {
      id: '5',
      name: 'Creative',
      color: '#8b5cf6',
      userId: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    userId: '1',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    order: 4,
  },
  {
    id: '6',
    title: '📞 Call mom for birthday',
    description: 'Wish her a happy birthday and catch up on family news',
    completed: true,
    priority: 'high',
    category: {
      id: '3',
      name: 'Personal',
      color: '#f59e0b',
      userId: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    userId: '1',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    order: 5,
  },
  {
    id: '7',
    title: '🔧 Fix responsive layout bug',
    description: 'Mobile view is breaking on iPhone 12, need to adjust CSS media queries',
    completed: false,
    priority: 'urgent',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    category: {
      id: '2',
      name: 'Work',
      color: '#10b981',
      userId: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    userId: '1',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    order: 6,
  },
  {
    id: '8',
    title: '🛒 Grocery shopping',
    description: 'Buy ingredients for weekend meal prep: chicken, vegetables, rice, and spices',
    completed: false,
    priority: 'low',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    category: {
      id: '1',
      name: 'General',
      color: '#3b82f6',
      userId: '1',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    userId: '1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    order: 7,
  }
];

const categories: Category[] = [
  {
    id: '1',
    name: 'General',
    color: '#3b82f6',
    userId: '1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Work',
    color: '#10b981',
    userId: '1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '3',
    name: 'Personal',
    color: '#f59e0b',
    userId: '1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '4',
    name: 'Health',
    color: '#ef4444',
    userId: '1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '5',
    name: 'Creative',
    color: '#8b5cf6',
    userId: '1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth functions
export const mockAuth = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await delay(500);
    
    const user = users.find(u => u.email === email);
    if (!user || password !== 'password') {
      throw new Error('Invalid credentials');
    }
    
    const token = `mock-token-${user.id}`;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('current_user', JSON.stringify(user));
    
    return { user, token };
  },

  async register(userData: { name: string; email: string; password: string }): Promise<{ user: User; token: string }> {
    await delay(500);
    
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User already exists');
    }
    
    const user: User = {
      id: generateId(),
      email: userData.email,
      name: userData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    users.push(user);
    
    const token = `mock-token-${user.id}`;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('current_user', JSON.stringify(user));
    
    return { user, token };
  },

  async getCurrentUser(): Promise<User> {
    await delay(200);
    
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const user = localStorage.getItem('current_user');
    if (!user) {
      throw new Error('User not found');
    }
    
    return JSON.parse(user);
  },

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }
};

// Todo functions
export const mockTodos = {
  async getTodos(filters?: FilterOptions): Promise<{ data: Todo[]; pagination: any }> {
    await delay(300);
    
    let filteredTodos = [...todos];
    
    // Apply filters
    if (filters?.status === 'completed') {
      filteredTodos = filteredTodos.filter(t => t.completed);
    } else if (filters?.status === 'pending') {
      filteredTodos = filteredTodos.filter(t => !t.completed);
    }
    
    if (filters?.priority) {
      filteredTodos = filteredTodos.filter(t => t.priority === filters.priority);
    }
    
    if (filters?.categoryId) {
      filteredTodos = filteredTodos.filter(t => t.category.id === filters.categoryId);
    }
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filteredTodos = filteredTodos.filter(t => 
        t.title.toLowerCase().includes(search) ||
        t.description?.toLowerCase().includes(search)
      );
    }
    
    // Apply sorting
    if (filters?.sortBy) {
      filteredTodos.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (filters.sortBy) {
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case 'dueDate':
            aValue = a.dueDate || new Date(0);
            bValue = b.dueDate || new Date(0);
            break;
          case 'priority':
            const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
            aValue = priorityOrder[a.priority];
            bValue = priorityOrder[b.priority];
            break;
          case 'createdAt':
          default:
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
        }
        
        if (filters.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    return {
      data: filteredTodos,
      pagination: {
        page: 1,
        limit: 100,
        total: filteredTodos.length,
        totalPages: 1,
      }
    };
  },

  async getTodo(id: string): Promise<Todo> {
    await delay(200);
    
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    return todo;
  },

  async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    await delay(300);
    
    const category = categories.find(c => c.id === todoData.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    
    const todo: Todo = {
      id: generateId(),
      title: todoData.title,
      description: todoData.description,
      completed: false,
      priority: todoData.priority,
      category,
      dueDate: todoData.dueDate ? new Date(todoData.dueDate) : undefined,
      userId: '1', // Mock user ID
      createdAt: new Date(),
      updatedAt: new Date(),
      order: todos.length,
    };
    
    todos.push(todo);
    return todo;
  },

  async updateTodo(id: string, updates: UpdateTodoRequest): Promise<Todo> {
    await delay(300);
    
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    const todo = todos[todoIndex];
    const category = updates.categoryId 
      ? categories.find(c => c.id === updates.categoryId) || todo.category
      : todo.category;
    
    const updatedTodo: Todo = {
      ...todo,
      ...updates,
      category,
      dueDate: updates.dueDate ? new Date(updates.dueDate) : todo.dueDate,
      updatedAt: new Date(),
    };
    
    todos[todoIndex] = updatedTodo;
    return updatedTodo;
  },

  async deleteTodo(id: string): Promise<void> {
    await delay(200);
    
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Todo not found');
    }
    
    todos.splice(index, 1);
  },

  async reorderTodos(todoIds: string[]): Promise<void> {
    await delay(200);
    
    const reorderedTodos = todoIds.map((id, index) => {
      const todo = todos.find(t => t.id === id);
      if (!todo) return null;
      return { ...todo, order: index };
    }).filter(Boolean) as Todo[];
    
    const remainingTodos = todos.filter(t => !todoIds.includes(t.id));
    todos = [...reorderedTodos, ...remainingTodos];
  }
};

// Category functions
export const mockCategories = {
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return [...categories];
  },

  async createCategory(categoryData: CreateCategoryRequest): Promise<Category> {
    await delay(300);
    
    const category: Category = {
      id: generateId(),
      name: categoryData.name,
      color: categoryData.color,
      userId: '1', // Mock user ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    categories.push(category);
    return category;
  },

  async updateCategory(id: string, updates: UpdateCategoryRequest): Promise<Category> {
    await delay(300);
    
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }
    
    const category = categories[categoryIndex];
    const updatedCategory: Category = {
      ...category,
      ...updates,
      updatedAt: new Date(),
    };
    
    categories[categoryIndex] = updatedCategory;
    return updatedCategory;
  },

  async deleteCategory(id: string): Promise<void> {
    await delay(200);
    
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    
    categories.splice(index, 1);
  }
};
