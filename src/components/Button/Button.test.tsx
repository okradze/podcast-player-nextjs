import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import Button from './Button'

afterEach(cleanup)

describe('Button', () => {
  const text = 'Hello'

  test('renders children', () => {
    render(<Button>{text}</Button>)
    expect(screen.queryByText(text)).toBeInTheDocument()
  })

  test('renders button element by default', () => {
    render(<Button>{text}</Button>)
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

  test('renders button element by default', () => {
    render(<Button element='link'>{text}</Button>)
    const element = screen.queryByText(text)
    expect(element instanceof HTMLAnchorElement).toBe(true)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
