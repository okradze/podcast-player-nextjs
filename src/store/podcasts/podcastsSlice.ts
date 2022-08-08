import { createSlice, Dispatch } from '@reduxjs/toolkit'
import listenNotesApi from '../../api/listenNotesApi'

interface PodcastsState {
  isFetching: boolean
  page: number
  lastFetchedPage: number | null
  hasNextPage: boolean
  podcasts: any[]
  error: string | null
}

export const initialState: PodcastsState = {
  isFetching: false,
  page: 1,
  lastFetchedPage: null,
  hasNextPage: false,
  podcasts: [],
  error: null,
}

export const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setLoading(state) {
      state.isFetching = true
    },
    setPodcasts(state, action) {
      const { has_next, page_number, podcasts } = action.payload

      state.isFetching = false
      state.error = null
      state.hasNextPage = has_next
      state.lastFetchedPage = page_number
      state.podcasts = [...state.podcasts, ...podcasts]
    },
    setError(state, action) {
      state.error = action.payload
    },
    nextPage(state) {
      state.page++
    },
  },
})

export const { setLoading, setPodcasts, setError, nextPage } = podcastsSlice.actions

export const fetchPodcasts = async (
  dispatch: Dispatch,
  page: number,
  lastFetchedPage: number,
) => {
  try {
    if (page > lastFetchedPage) {
      dispatch(setLoading())

      const { data } = await listenNotesApi.fetchBestPodcasts(page)

      dispatch(setPodcasts(data))
    }
  } catch (error) {
    dispatch(setError(error))
  }
}

export default podcastsSlice.reducer
