import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import PageNotFound from './PageNotFound'

afterEach(cleanup)

describe('PageNotFound', () => {
  it('should render', () => {
    render(<PageNotFound />)
    expect(screen.queryByRole('heading')).toBeInTheDocument()
    expect(screen.queryByTitle(/404 error illustration/i)).toBeInTheDocument()
  })
})
