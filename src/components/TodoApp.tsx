import { useTodos } from '../hooks/useTodos';
import { TodoForm } from './TodoForm';
import { FilterBar } from './FilterBar';
import { TodoList } from './TodoList';
import styles from './TodoApp.module.css';

export const TodoApp = () => {
  const {
    todos,
    filters,
    setFilters,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    stats,
  } = useTodos();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>TODO</h1>
      </header>

      <main className={styles.main}>
        <TodoForm onSubmit={addTodo} />
        <FilterBar filters={filters} onChange={setFilters} stats={stats} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
};
