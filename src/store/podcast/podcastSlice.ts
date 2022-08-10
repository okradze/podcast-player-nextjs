import { createSlice, Dispatch } from '@reduxjs/toolkit'
import listenNotesApi from '../../api/listenNotesApi'

export interface PodcastState {
  recommendations: any
  areEpisodesFetching: boolean
  error: string | null
}

export const initialState: PodcastState = {
  recommendations: null,
  areEpisodesFetching: false,
  error: null,
}

export const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload
    },
    setRecommendations(state, action) {
      state.recommendations = action.payload
      state.error = null
    },
    setEpisodesLoading(state) {
      state.areEpisodesFetching = true
    },
    setEpisodes(state, action) {
      // const episodes = state.podcast?.episodes || []
      state.areEpisodesFetching = false
      // state.podcast = action.payload
      // state.podcast.episodes = [...episodes, ...action.payload.episodes]
      // state.error = null
    },
  },
})

export const { setError, setRecommendations, setEpisodesLoading, setEpisodes } =
  podcastSlice.actions

export const fetchEpisodes = async (
  dispatch: Dispatch,
  podcastId: string,
  nextEpisodePubDate: number,
) => {
  try {
    dispatch(setEpisodesLoading())
    const { data } = await listenNotesApi.fetchEpisodes(podcastId, nextEpisodePubDate)
    dispatch(setEpisodes(data))
  } catch (error) {
    dispatch(setError(error))
  }
}

export default podcastSlice.reducer
