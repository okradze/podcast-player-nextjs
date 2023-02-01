import { render, cleanup, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { EpisodeItem } from './EpisodeItem'
import episode from '@/fixtures/episode'
import { createTestStore } from '@/utils/createTestStore'

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
