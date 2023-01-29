import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { PodcastItem } from './PodcastItem'
import { PODCAST_FIXTURE } from '@/fixtures/podcast'
import { createTestStore } from '@/utils/createTestStore'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('PodcastItem', () => {
  it('renders title and publisher', () => {
    render(
      <Provider store={store}>
        <PodcastItem {...PODCAST_FIXTURE} />
      </Provider>,
    )
    expect(screen.queryByText(PODCAST_FIXTURE.title)).toBeInTheDocument()
    expect(screen.queryByText(PODCAST_FIXTURE.publisher)).toBeInTheDocument()
  })
})
