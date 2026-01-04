import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoItem } from './TodoItem'
import type { Todo } from '../types/todo'
import { DEFAULT_CATEGORIES } from '../types/todo'

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'テストタスク',
    description: 'テストの説明',
    completed: false,
    categoryId: 'work',
    priority: 'high',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  }

  const mockOnToggle = vi.fn()
  const mockOnUpdate = vi.fn()
  const mockOnDelete = vi.fn()

  beforeEach(() => {
    mockOnToggle.mockClear()
    mockOnUpdate.mockClear()
    mockOnDelete.mockClear()
  })

  it('TODOのタイトルと説明が表示される', () => {
    render(
      <TodoItem
        todo={mockTodo}
        categories={DEFAULT_CATEGORIES}
        onToggle={mockOnToggle}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('テストタスク')).toBeInTheDocument()
    expect(screen.getByText('テストの説明')).toBeInTheDocument()
  })

  it('カテゴリと優先度が表示される', () => {
    render(
      <TodoItem
        todo={mockTodo}
        categories={DEFAULT_CATEGORIES}
        onToggle={mockOnToggle}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('仕事')).toBeInTheDocument()
    expect(screen.getByText('高')).toBeInTheDocument()
  })

  it('チェックボックスをクリックするとonToggleが呼ばれる', async () => {
    const user = userEvent.setup()
    render(
      <TodoItem
        todo={mockTodo}
        categories={DEFAULT_CATEGORIES}
        onToggle={mockOnToggle}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(mockOnToggle).toHaveBeenCalledWith('1')
  })

  it('削除ボタンをクリックするとonDeleteが呼ばれる', async () => {
    const user = userEvent.setup()
    render(
      <TodoItem
        todo={mockTodo}
        categories={DEFAULT_CATEGORIES}
        onToggle={mockOnToggle}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    await user.click(screen.getByRole('button', { name: '削除' }))

    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  it('編集モードに切り替えられる', async () => {
    const user = userEvent.setup()
    render(
      <TodoItem
        todo={mockTodo}
        categories={DEFAULT_CATEGORIES}
        onToggle={mockOnToggle}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    await user.click(screen.getByRole('button', { name: '編集' }))

    expect(screen.getByDisplayValue('テストタスク')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument()
  })

  it('編集を保存するとonUpdateが呼ばれる', async () => {
    const user = userEvent.setup()
    render(
      <TodoItem
        todo={mockTodo}
        categories={DEFAULT_CATEGORIES}
        onToggle={mockOnToggle}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    await user.click(screen.getByRole('button', { name: '編集' }))

    const titleInput = screen.getByDisplayValue('テストタスク')
    await user.clear(titleInput)
    await user.type(titleInput, '更新されたタスク')
    await user.click(screen.getByRole('button', { name: '保存' }))

    expect(mockOnUpdate).toHaveBeenCalledWith('1', expect.objectContaining({
      title: '更新されたタスク',
    }))
  })

  it('完了済みのTODOにはcompletedスタイルが適用される', () => {
    const completedTodo = { ...mockTodo, completed: true }
    render(
      <TodoItem
        todo={completedTodo}
        categories={DEFAULT_CATEGORIES}
        onToggle={mockOnToggle}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })
})
