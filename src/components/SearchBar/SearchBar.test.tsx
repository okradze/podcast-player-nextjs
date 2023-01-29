import { render, cleanup, fireEvent, waitFor, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { SearchBar } from './SearchBar'
import { SEARCH_FIXTURE } from '@/fixtures/search'

afterEach(cleanup)

jest.mock('@/api', () => ({
  clientApi: {
    podcasts: {
      fetchTypeahead: jest.fn().mockImplementation(() => Promise.resolve({ data: SEARCH_FIXTURE })),
    },
  },
}))

describe('SearchBar', () => {
  test('input changes and renders spinner', async () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText<HTMLInputElement>(/search/i)

    fireEvent.change(input, {
      target: { value: 'ab' },
    })

    await waitFor(() => screen.getByTestId('spinner'))

    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'))
    expect(input.value).toEqual('ab')
  })
})
