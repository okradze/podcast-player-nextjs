import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import ProfileButton from './ProfileButton'

afterEach(cleanup)

describe('ProfileButton', () => {
  const fullName = 'John Doe'

  test('renders full name and first letter in avatar', () => {
    render(<ProfileButton fullName={fullName} />)
    expect(screen.queryByText(fullName[0])).toBeInTheDocument()
    expect(screen.queryByText(fullName)).toBeInTheDocument()
  })
})
