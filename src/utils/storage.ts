import type { Todo, CategoryItem } from '../types/todo';
import { DEFAULT_CATEGORIES } from '../types/todo';

const STORAGE_KEY = 'todos';
const CATEGORIES_KEY = 'categories';

export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    console.error('Failed to load todos from localStorage');
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    console.error('Failed to save todos to localStorage');
  }
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

export const exportTodos = (todos: Todo[]): void => {
  const data = JSON.stringify(todos, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importTodos = (file: File): Promise<Todo[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (!Array.isArray(data)) {
          throw new Error('Invalid format');
        }
        resolve(data as Todo[]);
      } catch {
        reject(new Error('ファイルの読み込みに失敗しました'));
      }
    };
    reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
    reader.readAsText(file);
  });
};

export const loadCategories = (): CategoryItem[] => {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  } catch {
    console.error('Failed to load categories from localStorage');
    return DEFAULT_CATEGORIES;
  }
};

export const saveCategories = (categories: CategoryItem[]): void => {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch {
    console.error('Failed to save categories to localStorage');
  }
};
