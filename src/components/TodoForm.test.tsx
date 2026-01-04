import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoForm } from './TodoForm'
import { DEFAULT_CATEGORIES } from '../types/todo'

describe('TodoForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('入力フィールドと追加ボタンが表示される', () => {
    render(<TodoForm categories={DEFAULT_CATEGORIES} onSubmit={mockOnSubmit} />)

    expect(screen.getByPlaceholderText('新しいタスクを入力...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument()
  })

  it('フォーカス時に詳細入力欄が表示される', async () => {
    const user = userEvent.setup()
    render(<TodoForm categories={DEFAULT_CATEGORIES} onSubmit={mockOnSubmit} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.click(input)

    expect(screen.getByPlaceholderText('詳細（任意）')).toBeInTheDocument()
    expect(screen.getByText('カテゴリ')).toBeInTheDocument()
    expect(screen.getByText('優先度')).toBeInTheDocument()
    expect(screen.getByText('期限')).toBeInTheDocument()
  })

  it('タイトルを入力して追加できる', async () => {
    const user = userEvent.setup()
    render(<TodoForm categories={DEFAULT_CATEGORIES} onSubmit={mockOnSubmit} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, 'テストタスク')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith(
      'テストタスク',
      expect.any(String),
      'medium',
      undefined,
      undefined
    )
  })

  it('空のタイトルでは追加できない', async () => {
    const user = userEvent.setup()
    render(<TodoForm categories={DEFAULT_CATEGORIES} onSubmit={mockOnSubmit} />)

    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('追加後にフォームがリセットされる', async () => {
    const user = userEvent.setup()
    render(<TodoForm categories={DEFAULT_CATEGORIES} onSubmit={mockOnSubmit} />)

    const input = screen.getByPlaceholderText('新しいタスクを入力...')
    await user.type(input, 'テストタスク')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(input).toHaveValue('')
  })
})
