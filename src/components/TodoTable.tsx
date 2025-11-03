import React from 'react';
import { Todo, Priority } from '@/types';
import { Button } from './ui/Button';

interface TodoTableProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => Promise<any>;
  onUpdate: (id: string, updates: any) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
  onReorder: (todoIds: string[]) => Promise<any>;
  onEditRequest?: (todo: Todo) => void;
}

const priorityColors = {
  low: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
  medium: 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20',
  high: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20',
  urgent: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20',
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium', 
  high: 'High',
  urgent: 'Urgent',
};

export const TodoTable = React.memo<TodoTableProps>(({
  todos,
  onToggle,
  onUpdate,
  onDelete,
  onReorder,
  onEditRequest,
}) => {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case 'urgent':
        return '🔴';
      case 'high':
        return '🟠';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gray-100 dark:bg-[hsl(var(--card))] rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No tasks found</h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-[hsl(var(--border))]">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Task
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Priority
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Due Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Category
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Created
              </th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 dark:text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[hsl(var(--border))]">
            {todos.map((todo) => (
              <tr 
                key={todo.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
              >
                {/* Task Column */}
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onToggle(todo.id, !todo.completed)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                        todo.completed
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                      }`}
                      aria-label={todo.completed ? 'Mark as pending' : 'Mark as completed'}
                    >
                      {todo.completed && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {todo.title}
                      </div>
                      {todo.description && (
                        <div className={`text-sm ${todo.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'} mt-1`}>
                          {todo.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Priority Column */}
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
                    <span>{getPriorityIcon(todo.priority)}</span>
                    <span>{priorityLabels[todo.priority]}</span>
                  </span>
                </td>

                {/* Due Date Column */}
                <td className="py-4 px-4">
                  {todo.dueDate ? (
                    <span className={`text-sm ${new Date(todo.dueDate) < new Date() && !todo.completed ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                      {formatDate(todo.dueDate)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400 dark:text-gray-500">No due date</span>
                  )}
                </td>

                {/* Category Column */}
                <td className="py-4 px-4">
                  {todo.category ? (
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: todo.category.color }}
                      />
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {todo.category.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400 dark:text-gray-500">No category</span>
                  )}
                </td>

                {/* Created Column */}
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(todo.createdAt)}
                  </span>
                </td>

                {/* Actions Column */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditRequest ? onEditRequest(todo) : onUpdate(todo.id, { title: todo.title, description: todo.description })}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-900"
                      aria-label="Edit task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(todo.id)}
                      className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      aria-label="Delete task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="space-y-3 p-4">
          {todos.map((todo) => (
            <div 
              key={todo.id} 
              className="bg-white dark:bg-[hsl(var(--card))] border border-gray-200 dark:border-[hsl(var(--border))] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <button
                    onClick={() => onToggle(todo.id, !todo.completed)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 flex-shrink-0 mt-0.5 touch-target-sm ${
                      todo.completed
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                    }`}
                    aria-label={todo.completed ? 'Mark as pending' : 'Mark as completed'}
                  >
                    {todo.completed && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                      {todo.title}
                    </div>
                    {todo.description && (
                      <div className={`text-sm ${todo.completed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'} mt-1`}>
                        {todo.description}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditRequest ? onEditRequest(todo) : onUpdate(todo.id, { title: todo.title, description: todo.description })}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-900 touch-target-sm p-1"
                    aria-label="Edit task"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(todo.id)}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 touch-target-sm p-1"
                    aria-label="Delete task"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Card Body - Priority, Due Date, Category */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {/* Priority */}
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full font-medium ${priorityColors[todo.priority]}`}>
                  <span>{getPriorityIcon(todo.priority)}</span>
                  <span>{priorityLabels[todo.priority]}</span>
                </span>

                {/* Due Date */}
                {todo.dueDate && (
                  <span className={`px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 ${
                    new Date(todo.dueDate) < new Date() && !todo.completed 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    Due: {formatDate(todo.dueDate)}
                  </span>
                )}

                {/* Category */}
                {todo.category && (
                  <div className="flex items-center space-x-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: todo.category.color }}
                    />
                    <span className="text-gray-600 dark:text-gray-300">{todo.category.name}</span>
                  </div>
                )}

                {/* Created Date */}
                <span className="text-gray-500 dark:text-gray-400">
                  Created: {formatDate(todo.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

TodoTable.displayName = 'TodoTable';
