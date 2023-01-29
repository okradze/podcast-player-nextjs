import { render, cleanup, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { PodcastList } from './PodcastList'
import { BEST_PODCASTS_FIXTURE } from '@/fixtures/podcasts'
import { createTestStore } from '@/utils/createTestStore'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('PodcastList', () => {
  it('renders the content', () => {
    render(
      <Provider store={store}>
        <PodcastList podcasts={BEST_PODCASTS_FIXTURE.podcasts} />
      </Provider>,
    )

    BEST_PODCASTS_FIXTURE.podcasts.forEach(({ title, publisher }) => {
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(publisher)).toBeInTheDocument()
    })
  })

  it('renders with title', () => {
    const title = 'Podcast List 1'

    render(
      <Provider store={store}>
        <PodcastList podcasts={BEST_PODCASTS_FIXTURE.podcasts} title={title} />
      </Provider>,
    )

    expect(screen.getByText(title)).toBeInTheDocument()
  })
})
