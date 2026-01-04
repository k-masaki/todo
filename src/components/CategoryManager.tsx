import { useState } from 'react';
import type { CategoryItem } from '../types/todo';
import styles from './CategoryManager.module.css';

interface Props {
  categories: CategoryItem[];
  onAdd: (name: string, color: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<CategoryItem, 'id'>>) => void;
  onDelete: (id: string) => void;
}

const PRESET_COLORS = [
  '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
  '#9b59b6', '#1abc9c', '#e67e22', '#95a5a6',
];

export const CategoryManager = ({ categories, onAdd, onUpdate, onDelete }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(PRESET_COLORS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    onAdd(newName.trim(), newColor);
    setNewName('');
    setNewColor(PRESET_COLORS[0]);
  };

  const startEdit = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditColor(cat.color);
  };

  const saveEdit = () => {
    if (!editingId || !editName.trim()) return;
    onUpdate(editingId, { name: editName.trim(), color: editColor });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'カテゴリ編集を閉じる' : 'カテゴリを編集'}
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.list}>
            {categories.map(cat => (
              <div key={cat.id} className={styles.item}>
                {editingId === cat.id ? (
                  <div className={styles.editRow}>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.colorPicker}>
                      {PRESET_COLORS.map(color => (
                        <button
                          key={color}
                          className={`${styles.colorOption} ${editColor === color ? styles.selected : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setEditColor(color)}
                        />
                      ))}
                    </div>
                    <div className={styles.editActions}>
                      <button onClick={saveEdit} className={styles.saveBtn}>保存</button>
                      <button onClick={cancelEdit} className={styles.cancelBtn}>取消</button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.viewRow}>
                    <span
                      className={styles.colorBadge}
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className={styles.name}>{cat.name}</span>
                    <div className={styles.actions}>
                      <button onClick={() => startEdit(cat)} className={styles.editBtn}>
                        編集
                      </button>
                      <button
                        onClick={() => onDelete(cat.id)}
                        className={styles.deleteBtn}
                        disabled={categories.length <= 1}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.addForm}>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="新しいカテゴリ名"
              className={styles.input}
            />
            <div className={styles.colorPicker}>
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  className={`${styles.colorOption} ${newColor === color ? styles.selected : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNewColor(color)}
                />
              ))}
            </div>
            <button onClick={handleAdd} className={styles.addBtn}>
              追加
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
