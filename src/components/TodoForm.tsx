import { useState } from 'react';
import type { Priority, CategoryItem } from '../types/todo';
import { PRIORITY_LABELS } from '../types/todo';
import styles from './TodoForm.module.css';

interface Props {
  categories: CategoryItem[];
  onSubmit: (
    title: string,
    categoryId: string,
    priority: Priority,
    description?: string,
    dueDate?: string
  ) => void;
}

export const TodoForm = ({ categories, onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit(
      title.trim(),
      categoryId,
      priority,
      description.trim() || undefined,
      dueDate || undefined
    );

    setTitle('');
    setDescription('');
    setCategoryId(categories[0]?.id || '');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.mainRow}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          className={styles.titleInput}
          onFocus={() => setIsExpanded(true)}
        />
        <button type="submit" className={styles.submitButton}>
          追加
        </button>
      </div>

      {isExpanded && (
        <div className={styles.details}>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="詳細（任意）"
            className={styles.descriptionInput}
            rows={2}
          />

          <div className={styles.options}>
            <label className={styles.option}>
              <span>カテゴリ</span>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.option}>
              <span>優先度</span>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as Priority)}
              >
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.option}>
              <span>期限</span>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
            </label>
          </div>
        </div>
      )}
    </form>
  );
};
