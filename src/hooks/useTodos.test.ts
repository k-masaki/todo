import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTodos } from './useTodos'

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('初期状態では空のTODOリストを返す', () => {
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toEqual([])
    expect(result.current.stats.total).toBe(0)
  })

  it('TODOを追加できる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('テストタスク', 'work', 'high')
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].title).toBe('テストタスク')
    expect(result.current.todos[0].categoryId).toBe('work')
    expect(result.current.todos[0].priority).toBe('high')
    expect(result.current.todos[0].completed).toBe(false)
  })

  it('TODOを完了状態に切り替えられる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('テストタスク', 'work', 'high')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.toggleTodo(todoId)
    })

    expect(result.current.todos[0].completed).toBe(true)
    expect(result.current.stats.completed).toBe(1)
    expect(result.current.stats.active).toBe(0)
  })

  it('TODOを更新できる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('テストタスク', 'work', 'high')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.updateTodo(todoId, { title: '更新されたタスク' })
    })

    expect(result.current.todos[0].title).toBe('更新されたタスク')
  })

  it('TODOを削除できる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('テストタスク', 'work', 'high')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.deleteTodo(todoId)
    })

    expect(result.current.todos).toHaveLength(0)
  })

  it('フィルターで未完了のみ表示できる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('タスク1', 'work', 'high')
      result.current.addTodo('タスク2', 'work', 'medium')
    })

    const todoId = result.current.todos[0].id

    act(() => {
      result.current.toggleTodo(todoId)
    })

    act(() => {
      result.current.setFilters({ ...result.current.filters, status: 'active' })
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].completed).toBe(false)
  })

  it('カテゴリでフィルタリングできる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('仕事タスク', 'work', 'high')
      result.current.addTodo('個人タスク', 'personal', 'medium')
    })

    act(() => {
      result.current.setFilters({ ...result.current.filters, categoryId: 'work' })
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].categoryId).toBe('work')
  })

  it('優先度でソートできる', () => {
    const { result } = renderHook(() => useTodos())

    act(() => {
      result.current.addTodo('低優先度', 'work', 'low')
      result.current.addTodo('高優先度', 'work', 'high')
      result.current.addTodo('中優先度', 'work', 'medium')
    })

    act(() => {
      result.current.setFilters({ ...result.current.filters, sortBy: 'priority' })
    })

    expect(result.current.todos[0].priority).toBe('high')
    expect(result.current.todos[1].priority).toBe('medium')
    expect(result.current.todos[2].priority).toBe('low')
  })
})
