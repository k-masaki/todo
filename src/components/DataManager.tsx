import { useRef, useState } from 'react';
import type { Todo } from '../types/todo';
import { exportTodos, importTodos } from '../utils/storage';
import styles from './DataManager.module.css';

interface Props {
  todos: Todo[];
  onImport: (todos: Todo[]) => void;
}

export const DataManager = ({ todos, onImport }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleExport = () => {
    exportTodos(todos);
    setSuccess('エクスポートしました');
    setError(null);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedTodos = await importTodos(file);
      onImport(importedTodos);
      setSuccess(`${importedTodos.length}件のタスクをインポートしました`);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'インポートに失敗しました');
      setSuccess(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button onClick={handleExport} className={styles.button}>
          エクスポート
        </button>
        <button onClick={handleImportClick} className={styles.button}>
          インポート
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </div>
  );
};
