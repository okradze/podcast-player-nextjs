import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { PODCAST_FIXTURE } from '@/fixtures/podcast'
import { PodcastItem } from './PodcastItem'

afterEach(cleanup)

describe('PodcastItem', () => {
  it('renders title and publisher', () => {
    render(<PodcastItem {...PODCAST_FIXTURE} />)
    expect(screen.queryByText(PODCAST_FIXTURE.title)).toBeInTheDocument()
    expect(screen.queryByText(PODCAST_FIXTURE.publisher)).toBeInTheDocument()
  })
})
