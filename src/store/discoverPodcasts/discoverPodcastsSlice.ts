import { createSlice, Dispatch } from '@reduxjs/toolkit'
import listenNotesApi from '../../api/listenNotesApi'

export interface DiscoverPodcastsState {
  isFetching: boolean
  lastFetchedPage: number | null
  hasNextPage: boolean
  curated_lists: any[][]
  error: string | null
}

export const initialState: DiscoverPodcastsState = {
  curated_lists: [],
  isFetching: false,
  hasNextPage: false,
  lastFetchedPage: null,
  error: null,
}

export const discoverPodcastsSlice = createSlice({
  name: 'discoverPodcasts',
  initialState,
  reducers: {
    setLoading(state) {
      state.isFetching = true
    },
    setPodcastLists(state, action) {
      const { has_next, page_number, curated_lists } = action.payload

      state.isFetching = false
      state.error = null
      state.hasNextPage = has_next
      state.lastFetchedPage = page_number
      state.curated_lists = [...state.curated_lists, ...curated_lists]
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
})

export const { setLoading, setPodcastLists, setError } = discoverPodcastsSlice.actions

export const fetchPodcastLists = async (dispatch: Dispatch, page: number) => {
  try {
    dispatch(setLoading())
    const { data } = await listenNotesApi.fetchCuratedPodcasts(page)
    dispatch(setPodcastLists(data))
  } catch (error) {
    dispatch(setError(error))
  }
}

export default discoverPodcastsSlice.reducer
