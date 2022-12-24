import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import CustomPageError from './CustomPageError'

afterEach(cleanup)

describe('CustomPageError', () => {
  const title = 'Something went wrong'

  test('renders with text', () => {
    render(<CustomPageError title={title} />)
    expect(screen.queryByText(title)).toBeInTheDocument()
  })
})
