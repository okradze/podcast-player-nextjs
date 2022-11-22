import React from 'react'
import { Provider } from 'react-redux'
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { EpisodeList } from './EpisodeList'
import { createTestStore } from '../../utils/createTestStore'
import { PODCAST_FIXTURE } from '../../fixtures/podcast'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

jest.mock('../../api/api', () => ({
  fetchEpisodes: jest.fn().mockImplementation(() => Promise.resolve({ data: PODCAST_FIXTURE })),
}))

describe('EpisodeList', () => {
  it('renders spinner when fetching', async () => {
    render(
      <Provider store={store}>
        <EpisodeList podcast={PODCAST_FIXTURE} setPodcast={() => {}} />
      </Provider>,
    )

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Load More'))
    await waitFor(() => screen.getByTestId('spinner'))
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  })

  it('renders load more button when more episodes are available and episodes are not fetching', () => {
    render(
      <Provider store={store}>
        <EpisodeList podcast={PODCAST_FIXTURE} setPodcast={() => {}} />
      </Provider>,
    )

    expect(screen.getByText(/load more/i)).toBeInTheDocument()
  })

  it('does not render load more button when there are no more episodes', () => {
    render(
      <Provider store={store}>
        <EpisodeList
          podcast={{ ...PODCAST_FIXTURE, next_episode_pub_date: null! }}
          setPodcast={() => {}}
        />
      </Provider>,
    )

    expect(screen.queryByText(/load more/i)).not.toBeInTheDocument()
  })
})
