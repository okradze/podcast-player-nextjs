import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, cleanup, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { EpisodeList } from './EpisodeList'
import { setPodcast } from '@/store/podcast/podcastSlice'
import { createTestStore } from '@/utils/createTestStore'
import { PODCAST_FIXTURE, PODCAST_FIXTURE_PAGE_2 } from '@/fixtures/podcast'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

let resolveFetchEpisodes: (value: unknown) => void

jest.mock('@/api', () => ({
  clientApi: {
    podcasts: {
      fetchEpisodes: jest.fn().mockImplementation(
        () =>
          new Promise(resolve => {
            resolveFetchEpisodes = resolve
          }),
      ),
    },
  },
}))

describe('EpisodeList', () => {
  it('renders spinner when fetching', async () => {
    store.dispatch(setPodcast(PODCAST_FIXTURE))

    render(
      <Provider store={store}>
        <EpisodeList />
      </Provider>,
    )

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Load More'))
    await waitFor(() => screen.getByTestId('spinner'))

    resolveFetchEpisodes({ data: PODCAST_FIXTURE_PAGE_2 })
    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
  })

  it('renders load more button when more episodes are available and episodes are not fetching', () => {
    store.dispatch(setPodcast(PODCAST_FIXTURE))

    render(
      <Provider store={store}>
        <EpisodeList />
      </Provider>,
    )

    expect(screen.getByText('Load More')).toBeInTheDocument()
  })

  it('does not render load more button when there are no more episodes', () => {
    store.dispatch(setPodcast({ ...PODCAST_FIXTURE, total_episodes: 10 }))

    render(
      <Provider store={store}>
        <EpisodeList />
      </Provider>,
    )

    expect(screen.queryByText('Load More')).not.toBeInTheDocument()
  })
})
