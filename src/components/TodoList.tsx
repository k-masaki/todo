import type { Todo, CategoryItem } from '../types/todo';
import { TodoItem } from './TodoItem';
import styles from './TodoList.module.css';

interface Props {
  todos: Todo[];
  categories: CategoryItem[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ todos, categories, onToggle, onUpdate, onDelete }: Props) => {
  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>タスクがありません</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          categories={categories}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
