import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'

import AuthLayout from './AuthLayout'

afterEach(cleanup)

describe('AuthLayout', () => {
  it('renders texts and children', async () => {
    const title = 'Sign In'
    const subtitle = 'Sign in to see your favorite podcasts'

    render(
      <AuthLayout pageTitle='Sign In - Podcast Player' title={title} subtitle={subtitle}>
        <h1>Children</h1>
      </AuthLayout>,
    )

    expect(screen.queryByText(title)).toBeInTheDocument()
    expect(screen.queryByText(subtitle)).toBeInTheDocument()
    expect(screen.queryByText('Children')).toBeInTheDocument()
  })
})
