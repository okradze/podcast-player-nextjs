import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import PodcastFavoriteButton from './PodcastFavoriteButton'
import { setMe } from '@/store/auth/authSlice'
import { createTestStore } from '@/utils/createTestStore'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('PodcastFavoriteButton', () => {
  it('does not render when there user is not logged in', () => {
    render(
      <Provider store={store}>
        <PodcastFavoriteButton id='1' isFavorite />
      </Provider>,
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders when there user is logged in', () => {
    store.dispatch(setMe({ id: 1, fullName: 'John Doe', email: 'test@gmail.com' }))

    render(
      <Provider store={store}>
        <PodcastFavoriteButton id='1' isFavorite />
      </Provider>,
    )

    expect(screen.queryByRole('button')).toBeInTheDocument()
  })
})
