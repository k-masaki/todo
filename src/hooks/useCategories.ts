import { useState, useEffect, useCallback } from 'react';
import type { CategoryItem } from '../types/todo';
import { loadCategories, saveCategories, generateId } from '../utils/storage';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    setCategories(loadCategories());
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      saveCategories(categories);
    }
  }, [categories]);

  const addCategory = useCallback((name: string, color: string) => {
    const newCategory: CategoryItem = {
      id: generateId(),
      name,
      color,
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory.id;
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Omit<CategoryItem, 'id'>>) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  }, []);

  const getCategoryById = useCallback((id: string): CategoryItem | undefined => {
    return categories.find(cat => cat.id === id);
  }, [categories]);

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
};
