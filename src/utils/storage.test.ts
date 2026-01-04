import { describe, it, expect, beforeEach } from 'vitest'
import {
  loadTodos,
  saveTodos,
  generateId,
  loadCategories,
  saveCategories,
} from './storage'
import type { Todo, CategoryItem } from '../types/todo'
import { DEFAULT_CATEGORIES } from '../types/todo'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('loadTodos', () => {
    it('空のLocalStorageから空の配列を返す', () => {
      const todos = loadTodos()
      expect(todos).toEqual([])
    })

    it('保存されたTODOを読み込む', () => {
      const mockTodos: Todo[] = [
        {
          id: '1',
          title: 'テストタスク',
          completed: false,
          categoryId: 'work',
          priority: 'high',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ]
      localStorage.setItem('todos', JSON.stringify(mockTodos))

      const todos = loadTodos()
      expect(todos).toEqual(mockTodos)
    })

    it('不正なJSONの場合は空の配列を返す', () => {
      localStorage.setItem('todos', 'invalid json')
      const todos = loadTodos()
      expect(todos).toEqual([])
    })
  })

  describe('saveTodos', () => {
    it('TODOをLocalStorageに保存する', () => {
      const mockTodos: Todo[] = [
        {
          id: '1',
          title: 'テストタスク',
          completed: false,
          categoryId: 'work',
          priority: 'high',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ]

      saveTodos(mockTodos)

      const saved = localStorage.getItem('todos')
      expect(saved).toBe(JSON.stringify(mockTodos))
    })
  })

  describe('generateId', () => {
    it('ユニークなIDを生成する', () => {
      const id1 = generateId()
      const id2 = generateId()

      expect(id1).toBeTruthy()
      expect(id2).toBeTruthy()
      expect(id1).not.toBe(id2)
    })

    it('IDはタイムスタンプとランダム文字列を含む', () => {
      const id = generateId()
      expect(id).toMatch(/^\d+-[a-z0-9]+$/)
    })
  })

  describe('loadCategories', () => {
    it('空のLocalStorageからデフォルトカテゴリを返す', () => {
      const categories = loadCategories()
      expect(categories).toEqual(DEFAULT_CATEGORIES)
    })

    it('保存されたカテゴリを読み込む', () => {
      const mockCategories: CategoryItem[] = [
        { id: 'custom', name: 'カスタム', color: '#ff0000' },
      ]
      localStorage.setItem('categories', JSON.stringify(mockCategories))

      const categories = loadCategories()
      expect(categories).toEqual(mockCategories)
    })
  })

  describe('saveCategories', () => {
    it('カテゴリをLocalStorageに保存する', () => {
      const mockCategories: CategoryItem[] = [
        { id: 'custom', name: 'カスタム', color: '#ff0000' },
      ]

      saveCategories(mockCategories)

      const saved = localStorage.getItem('categories')
      expect(saved).toBe(JSON.stringify(mockCategories))
    })
  })
})
