import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import listenNotesApi, { IBestPodcasts, IPodcast } from '../../api/listenNotesApi'

export interface PodcastsState {
  isFetching: boolean
  lastFetchedPage: number | null
  hasNextPage: boolean
  podcasts: IPodcast[]
  error: string | null
}

export const initialState: PodcastsState = {
  isFetching: false,
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
    setPodcasts(state, action: PayloadAction<IBestPodcasts>) {
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
  },
})

export const { setLoading, setPodcasts, setError } = podcastsSlice.actions

export const fetchPodcasts = async (dispatch: Dispatch, page: number) => {
  try {
    dispatch(setLoading())
    const { data } = await listenNotesApi.fetchBestPodcasts(page)
    dispatch(setPodcasts(data))
  } catch (error) {
    dispatch(setError(error))
  }
}

export default podcastsSlice.reducer
