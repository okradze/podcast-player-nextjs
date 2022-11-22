import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { SearchBar } from './SearchBar'
import mockSearch from '../../fixtures/search'

afterEach(cleanup)

jest.mock('../../api/api', () => ({
  fetchTypeahead: jest.fn().mockImplementation(() => Promise.resolve({ data: mockSearch })),
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
