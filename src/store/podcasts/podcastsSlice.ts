import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { podcastsApi } from '../../api'
import { IBestPodcasts, IPodcast } from '../../api/podcasts'

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
    toggleFavoritePodcast(state, action: PayloadAction<string>) {
      const podcast = state.podcasts.find(podcast => podcast.id === action.payload)

      if (podcast) {
        podcast.isFavorite = !podcast.isFavorite
      }
    },
    setError(state, action) {
      state.error = action.payload
    },
    reset() {
      return { ...initialState }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (state.podcasts.length > 0) return state

      return {
        ...state,
        ...action.payload.podcasts,
        podcasts: action.payload.podcasts.podcasts,
      }
    },
  },
})

export const { setLoading, setPodcasts, setError, reset, toggleFavoritePodcast } =
  podcastsSlice.actions

export const fetchPodcasts = async (dispatch: Dispatch, page: number) => {
  try {
    dispatch(setLoading())
    const { data } = await podcastsApi.fetchBestPodcasts(page)
    dispatch(setPodcasts(data))
  } catch (error) {
    dispatch(setError(error))
  }
}

export default podcastsSlice.reducer
