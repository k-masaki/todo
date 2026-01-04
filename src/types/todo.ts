export type Category = 'work' | 'personal' | 'shopping' | 'other';
export type Priority = 'high' | 'medium' | 'low';
export type SortBy = 'dueDate' | 'priority' | 'createdAt';
export type FilterStatus = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  status: FilterStatus;
  category: Category | 'all';
  priority: Priority | 'all';
  sortBy: SortBy;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  work: '仕事',
  personal: '個人',
  shopping: '買い物',
  other: 'その他',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};
