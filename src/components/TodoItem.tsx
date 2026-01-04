import { useState } from 'react';
import type { Todo, Category, Priority } from '../types/todo';
import { CATEGORY_LABELS, PRIORITY_LABELS } from '../types/todo';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onUpdate, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      category: editCategory,
      priority: editPriority,
      dueDate: editDueDate || undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditCategory(todo.category);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setIsEditing(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ja-JP');
  };

  if (isEditing) {
    return (
      <div className={styles.item}>
        <div className={styles.editForm}>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className={styles.editInput}
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            placeholder="詳細"
            className={styles.editTextarea}
            rows={2}
          />
          <div className={styles.editOptions}>
            <select
              value={editCategory}
              onChange={e => setEditCategory(e.target.value as Category)}
            >
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <select
              value={editPriority}
              onChange={e => setEditPriority(e.target.value as Priority)}
            >
              {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={e => setEditDueDate(e.target.value)}
            />
          </div>
          <div className={styles.editActions}>
            <button onClick={handleSave} className={styles.saveButton}>保存</button>
            <button onClick={handleCancel} className={styles.cancelButton}>キャンセル</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.item} ${todo.completed ? styles.completed : ''} ${isOverdue ? styles.overdue : ''}`}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          id={`todo-${todo.id}`}
        />
      </div>

      <div className={styles.content}>
        <label htmlFor={`todo-${todo.id}`} className={styles.title}>
          {todo.title}
        </label>
        {todo.description && (
          <p className={styles.description}>{todo.description}</p>
        )}
        <div className={styles.meta}>
          <span className={`${styles.category} ${styles[todo.category]}`}>
            {CATEGORY_LABELS[todo.category]}
          </span>
          <span className={`${styles.priority} ${styles[`priority-${todo.priority}`]}`}>
            {PRIORITY_LABELS[todo.priority]}
          </span>
          {todo.dueDate && (
            <span className={`${styles.dueDate} ${isOverdue ? styles.dueDateOverdue : ''}`}>
              {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={() => setIsEditing(true)} className={styles.editButton}>
          編集
        </button>
        <button onClick={() => onDelete(todo.id)} className={styles.deleteButton}>
          削除
        </button>
      </div>
    </div>
  );
};
