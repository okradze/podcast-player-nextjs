import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import ResetLinkExpired from './ResetLinkExpired'

afterEach(cleanup)

describe('ResetLinkExpired', () => {
  it('should render', () => {
    render(<ResetLinkExpired />)
    expect(screen.queryByRole('heading')).toBeInTheDocument()
    expect(screen.queryByTitle(/no data illustration/i)).toBeInTheDocument()
  })
})
