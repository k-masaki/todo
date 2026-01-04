import { useTodos } from '../hooks/useTodos';
import { useCategories } from '../hooks/useCategories';
import { TodoForm } from './TodoForm';
import { FilterBar } from './FilterBar';
import { TodoList } from './TodoList';
import { DataManager } from './DataManager';
import { CategoryManager } from './CategoryManager';
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
    replaceAllTodos,
    getAllTodos,
  } = useTodos();

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>TODO</h1>
      </header>

      <main className={styles.main}>
        <TodoForm categories={categories} onSubmit={addTodo} />
        <FilterBar
          filters={filters}
          categories={categories}
          onChange={setFilters}
          stats={stats}
        />
        <TodoList
          todos={todos}
          categories={categories}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
        <CategoryManager
          categories={categories}
          onAdd={addCategory}
          onUpdate={updateCategory}
          onDelete={deleteCategory}
        />
        <DataManager todos={getAllTodos()} onImport={replaceAllTodos} />
      </main>
    </div>
  );
};
