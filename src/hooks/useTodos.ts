import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Todo, TodoFilters, Category, Priority } from '../types/todo';
import { loadTodos, saveTodos, generateId } from '../utils/storage';

const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
    category: 'all',
    priority: 'all',
    sortBy: 'createdAt',
  });

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = useCallback((
    title: string,
    category: Category,
    priority: Priority,
    description?: string,
    dueDate?: string
  ) => {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: generateId(),
      title,
      description,
      completed: false,
      category,
      priority,
      dueDate,
      createdAt: now,
      updatedAt: now,
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    // Filter by status
    if (filters.status === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filters.status === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter(todo => todo.category === filters.category);
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      result = result.filter(todo => todo.priority === filters.priority);
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [todos, filters]);

  const stats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }), [todos]);

  const replaceAllTodos = useCallback((newTodos: Todo[]) => {
    setTodos(newTodos);
  }, []);

  const getAllTodos = useCallback(() => {
    return todos;
  }, [todos]);

  return {
    todos: filteredTodos,
    filters,
    setFilters,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    stats,
    replaceAllTodos,
    getAllTodos,
  };
};
