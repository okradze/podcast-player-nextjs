import { render, cleanup, screen } from '@testing-library/react'
import React from 'react'

import { Spinner } from './Spinner'

afterEach(cleanup)

test('should render Spinner component', () => {
  render(<Spinner />)
  expect(screen.queryByTestId('spinner')).toBeInTheDocument()
})
