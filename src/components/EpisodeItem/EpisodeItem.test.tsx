import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import episode from '@/fixtures/episode'
import { createTestStore } from '@/utils/createTestStore'
import { EpisodeItem } from './EpisodeItem'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('EpisodeItem', () => {
  it('renders episode', () => {
    render(
      <Provider store={store}>
        <EpisodeItem podcastId='' episode={episode} />
      </Provider>,
    )

    expect(screen.queryByText(episode.title)).toBeInTheDocument()
  })
})
