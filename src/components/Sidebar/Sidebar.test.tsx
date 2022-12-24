import React from 'react'
import { Provider } from 'react-redux'
import { render, screen, cleanup } from '@testing-library/react'
import { playEpisode } from '@/store/playingPodcast/playingPodcastSlice'
import { createTestStore } from '@/utils/createTestStore'
import episode from '@/fixtures/episode'
import { Sidebar } from './Sidebar'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

describe('Sidebar', () => {
  it('renders sidebar', () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    )
    expect(screen.getByText(/home$/i)).toBeInTheDocument()
    expect(screen.getByText(/discover$/i)).toBeInTheDocument()
    expect(screen.queryByText(/now playing$/i)).not.toBeInTheDocument()
  })

  it('renders now playing navlink if podcast is playing', () => {
    const payload = {
      podcastId: '123',
      episode,
    }

    store.dispatch(playEpisode(payload))

    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    )

    expect(screen.getByText(/now playing$/i)).toBeInTheDocument()
  })
})
