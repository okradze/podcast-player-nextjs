import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { podcastsApi } from '../../api'
import { ICuratedPodcastList, ICuratedPodcasts } from '../../api/podcasts'

export interface DiscoverPodcastsState {
  isFetching: boolean
  lastFetchedPage: number | null
  hasNextPage: boolean
  curated_lists: ICuratedPodcastList[]
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
    setPodcastLists(state, action: PayloadAction<ICuratedPodcasts>) {
      const { has_next, page_number, curated_lists } = action.payload

      state.isFetching = false
      state.error = null
      state.hasNextPage = has_next
      state.lastFetchedPage = page_number
      state.curated_lists = [...state.curated_lists, ...curated_lists]
    },
    toggleFavoritePodcast(state, action: PayloadAction<string>) {
      state.curated_lists.forEach(list => {
        const podcast = list.podcasts.find(podcast => podcast.id === action.payload)

        if (podcast) {
          podcast.isFavorite = !podcast.isFavorite
        }
      })
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
      if (state.curated_lists.length > 0) return state

      return {
        ...state,
        ...action.payload.discoverPodcasts,
        curated_lists: action.payload.discoverPodcasts.curated_lists,
      }
    },
  },
})

export const { setLoading, setPodcastLists, toggleFavoritePodcast, setError, reset } =
  discoverPodcastsSlice.actions

export const fetchPodcastLists = async (dispatch: Dispatch, page: number) => {
  try {
    dispatch(setLoading())
    const { data } = await podcastsApi.fetchCuratedPodcasts(page)
    dispatch(setPodcastLists(data))
  } catch (error) {
    dispatch(setError(error))
  }
}

export default discoverPodcastsSlice.reducer
