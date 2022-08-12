import { render, screen, cleanup } from '@testing-library/react'
import { SearchBarItem } from './SearchBarItem'
import searchResults from '../../fixtures/search'

const mockPodcast = searchResults.podcasts[0]

afterEach(cleanup)

describe('SearchBarItem', () => {
  it('should render title and publisher', () => {
    render(<SearchBarItem {...mockPodcast} clearSearch={() => {}} />)

    const { title_original, publisher_original } = mockPodcast
    expect(screen.queryByText(title_original)).toBeInTheDocument()
    expect(screen.queryByText(publisher_original)).toBeInTheDocument()
  })
})
