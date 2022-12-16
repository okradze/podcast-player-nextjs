import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import api, { IPodcast, IPodcastDetails } from '../../api/api'

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
  toggleFavoritePodcastInRecommendations,
} = podcastSlice.actions

export const fetchEpisodes = async (
  dispatch: Dispatch,
  podcastId: string,
  next_episode_pub_date: number,
) => {
  try {
    dispatch(setEpisodesLoading())

    const { data } = await api.fetchEpisodes(podcastId, next_episode_pub_date)

    dispatch(setEpisodes(data))
  } catch (error) {}
}

export default podcastSlice.reducer