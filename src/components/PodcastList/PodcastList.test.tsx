import React from 'react'
import { render, cleanup, screen } from '@testing-library/react'
import { BEST_PODCASTS_FIXTURE } from '@/fixtures/podcasts'
import { PodcastList } from './PodcastList'

afterEach(cleanup)

describe('PodcastList', () => {
  it('renders with default title and content', () => {
    render(<PodcastList podcasts={BEST_PODCASTS_FIXTURE.podcasts} />)
    expect(screen.getByText(/popular podcast/i)).toBeInTheDocument()

    BEST_PODCASTS_FIXTURE.podcasts.forEach(({ title, publisher }) => {
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(publisher)).toBeInTheDocument()
    })
  })
  it('renders with title', () => {
    const title = 'Podcast List 1'
    render(<PodcastList podcasts={BEST_PODCASTS_FIXTURE.podcasts} title={title} />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })
})
