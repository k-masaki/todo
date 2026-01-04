import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCategories } from './useCategories'
import { DEFAULT_CATEGORIES } from '../types/todo'

describe('useCategories', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('初期状態ではデフォルトカテゴリを返す', () => {
    const { result } = renderHook(() => useCategories())
    expect(result.current.categories).toEqual(DEFAULT_CATEGORIES)
  })

  it('カテゴリを追加できる', () => {
    const { result } = renderHook(() => useCategories())

    act(() => {
      result.current.addCategory('新しいカテゴリ', '#ff0000')
    })

    expect(result.current.categories).toHaveLength(DEFAULT_CATEGORIES.length + 1)
    const newCategory = result.current.categories.find(c => c.name === '新しいカテゴリ')
    expect(newCategory).toBeTruthy()
    expect(newCategory?.color).toBe('#ff0000')
  })

  it('カテゴリを更新できる', () => {
    const { result } = renderHook(() => useCategories())
    const categoryId = result.current.categories[0].id

    act(() => {
      result.current.updateCategory(categoryId, { name: '更新された名前' })
    })

    expect(result.current.categories[0].name).toBe('更新された名前')
  })

  it('カテゴリを削除できる', () => {
    const { result } = renderHook(() => useCategories())
    const initialLength = result.current.categories.length
    const categoryId = result.current.categories[0].id

    act(() => {
      result.current.deleteCategory(categoryId)
    })

    expect(result.current.categories).toHaveLength(initialLength - 1)
    expect(result.current.categories.find(c => c.id === categoryId)).toBeUndefined()
  })

  it('getCategoryByIdでカテゴリを取得できる', () => {
    const { result } = renderHook(() => useCategories())
    const category = result.current.categories[0]

    const found = result.current.getCategoryById(category.id)
    expect(found).toEqual(category)
  })

  it('存在しないIDの場合はundefinedを返す', () => {
    const { result } = renderHook(() => useCategories())

    const found = result.current.getCategoryById('non-existent-id')
    expect(found).toBeUndefined()
  })
})
