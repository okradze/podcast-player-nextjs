import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, cleanup } from '@testing-library/react'
import { createTestStore } from '@/utils/createTestStore'
import Favorites from './Favorites'
import { setFavorites } from '@/store/favorites/favoritesSlice'
import { BEST_PODCASTS_FIXTURE } from '@/fixtures/podcasts'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('Favorites', () => {
  it('renders text and illustration if user has no podcasts', () => {
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>,
    )

    expect(screen.queryByText('No Favorite Podcasts')).toBeInTheDocument()
    expect(screen.queryByTitle('Empty Box Illustration')).toBeInTheDocument()
  })

  it('renders podcasts when user has favorite podcasts', () => {
    store.dispatch(setFavorites(BEST_PODCASTS_FIXTURE.podcasts))

    render(
      <Provider store={store}>
        <Favorites />
      </Provider>,
    )

    expect(screen.queryByText('No Favorite Podcasts')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Empty Box Illustration')).not.toBeInTheDocument()
    expect(screen.queryByText('Favorite Podcasts')).toBeInTheDocument()
  })
})
