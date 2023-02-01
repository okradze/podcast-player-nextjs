import { render, screen, cleanup } from '@testing-library/react'

import { SearchBarItem } from './SearchBarItem'
import { SEARCH_FIXTURE } from '@/fixtures/search'

const PODCAST = SEARCH_FIXTURE.podcasts[0]

afterEach(cleanup)

describe('SearchBarItem', () => {
  it('should render title and publisher', () => {
    render(<SearchBarItem {...PODCAST} clearSearch={() => {}} />)

    const { title_original, publisher_original } = PODCAST
    expect(screen.queryByText(title_original)).toBeInTheDocument()
    expect(screen.queryByText(publisher_original)).toBeInTheDocument()
  })
})
