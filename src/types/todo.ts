export type Priority = 'high' | 'medium' | 'low';
export type SortBy = 'dueDate' | 'priority' | 'createdAt';
export type FilterStatus = 'all' | 'active' | 'completed';

export interface CategoryItem {
  id: string;
  name: string;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  categoryId: string;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  status: FilterStatus;
  categoryId: string | 'all';
  priority: Priority | 'all';
  sortBy: SortBy;
}

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'work', name: '仕事', color: '#e74c3c' },
  { id: 'personal', name: '個人', color: '#3498db' },
  { id: 'shopping', name: '買い物', color: '#f39c12' },
  { id: 'other', name: 'その他', color: '#95a5a6' },
];

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};
