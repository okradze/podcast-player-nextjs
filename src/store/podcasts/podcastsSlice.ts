import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { clientApi } from '@/api'
import { IBestPodcasts, IPodcast } from '@/api/podcasts'

export interface PodcastsState {
  isFetching: boolean
  lastFetchedPage: number | null
  hasNextPage: boolean
  podcasts: IPodcast[]
}

export const initialState: PodcastsState = {
  isFetching: false,
  lastFetchedPage: null,
  hasNextPage: false,
  podcasts: [],
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

export const { setLoading, setPodcasts, reset, toggleFavoritePodcast } = podcastsSlice.actions

export const fetchPodcasts = async (dispatch: Dispatch, page: number) => {
  dispatch(setLoading())
  const { data } = await clientApi.podcasts.fetchBestPodcasts(page)
  if (data) dispatch(setPodcasts(data))
}

export default podcastsSlice.reducer
