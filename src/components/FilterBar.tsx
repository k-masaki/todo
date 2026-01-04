import type { TodoFilters, Priority, FilterStatus, SortBy, CategoryItem } from '../types/todo';
import { PRIORITY_LABELS } from '../types/todo';
import styles from './FilterBar.module.css';

interface Props {
  filters: TodoFilters;
  categories: CategoryItem[];
  onChange: (filters: TodoFilters) => void;
  stats: { total: number; active: number; completed: number };
}

export const FilterBar = ({ filters, categories, onChange, stats }: Props) => {
  const updateFilter = <K extends keyof TodoFilters>(key: K, value: TodoFilters[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.stats}>
        <span>全体: {stats.total}</span>
        <span>未完了: {stats.active}</span>
        <span>完了: {stats.completed}</span>
      </div>

      <div className={styles.filters}>
        <label className={styles.filter}>
          <span>状態</span>
          <select
            value={filters.status}
            onChange={e => updateFilter('status', e.target.value as FilterStatus)}
          >
            <option value="all">すべて</option>
            <option value="active">未完了</option>
            <option value="completed">完了</option>
          </select>
        </label>

        <label className={styles.filter}>
          <span>カテゴリ</span>
          <select
            value={filters.categoryId}
            onChange={e => updateFilter('categoryId', e.target.value)}
          >
            <option value="all">すべて</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span>優先度</span>
          <select
            value={filters.priority}
            onChange={e => updateFilter('priority', e.target.value as Priority | 'all')}
          >
            <option value="all">すべて</option>
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filter}>
          <span>並び替え</span>
          <select
            value={filters.sortBy}
            onChange={e => updateFilter('sortBy', e.target.value as SortBy)}
          >
            <option value="createdAt">作成日</option>
            <option value="dueDate">期限</option>
            <option value="priority">優先度</option>
          </select>
        </label>
      </div>
    </div>
  );
};
