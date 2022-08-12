import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { EpisodeItem } from './EpisodeItem'
import episode from '../../fixtures/episode'
import { createTestStore } from '../../utils/createTestStore'
import { Provider } from 'react-redux'

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
