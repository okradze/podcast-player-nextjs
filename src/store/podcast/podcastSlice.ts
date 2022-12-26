import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { clientApi } from '@/api'
import { IPodcast, IPodcastDetails } from '@/api/podcasts'

export interface PodcastState {
  podcast: IPodcastDetails | null
  recommendations: IPodcast[]
  areEpisodesFetching: boolean
}

export const initialState: PodcastState = {
  podcast: null,
  recommendations: [],
  areEpisodesFetching: false,
}

export const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    setPodcast(state, action: PayloadAction<IPodcastDetails>) {
      state.podcast = action.payload
      return state
    },
    setRecommendations(state, action: PayloadAction<IPodcast[]>) {
      state.recommendations = action.payload
    },
    toggleFavoritePodcast(state, action: PayloadAction<string>) {
      const { podcast } = state
      if (podcast && podcast.id === action.payload) podcast.isFavorite = !podcast.isFavorite
    },
    toggleFavoritePodcastInRecommendations(state, action: PayloadAction<string>) {
      const podcast = state.recommendations.find(podcast => podcast.id === action.payload)

      if (podcast) {
        podcast.isFavorite = !podcast.isFavorite
      }
    },
    setEpisodesLoading(state) {
      state.areEpisodesFetching = true
    },
    setEpisodes(state, action: PayloadAction<IPodcastDetails>) {
      if (!state.podcast) return

      const episodes = state.podcast.episodes
      state.areEpisodesFetching = false
      state.podcast = action.payload
      state.podcast.episodes = [...episodes, ...action.payload.episodes]
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      const { podcast, recommendations } = action.payload.podcast

      return {
        ...state,
        podcast,
        recommendations,
      }
    },
  },
})

export const {
  setPodcast,
  setRecommendations,
  setEpisodesLoading,
  setEpisodes,
  toggleFavoritePodcast,
  toggleFavoritePodcastInRecommendations,
} = podcastSlice.actions

export const fetchEpisodes = async (
  dispatch: Dispatch,
  podcastId: string,
  next_episode_pub_date: number,
) => {
  dispatch(setEpisodesLoading())
  const { data } = await clientApi.podcasts.fetchEpisodes(podcastId, next_episode_pub_date)
  if (data) dispatch(setEpisodes(data))
}

export default podcastSlice.reducer
