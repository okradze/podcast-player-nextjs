import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEpisode } from '@/api/podcasts'

export interface PlayingPodcastState {
  minimized: boolean
  podcastId: string
  playingEpisode: IEpisode | null
  isPlaying: boolean
  volume: number
  currentTime: number
}

export const initialState: PlayingPodcastState = {
  minimized: false,
  podcastId: '',
  playingEpisode: null,
  isPlaying: false,
  volume: 1.0,
  currentTime: 0,
}

export const playingPodcastSlice = createSlice({
  name: 'playingPodcast',
  initialState,
  reducers: {
    toggleMinimize(state) {
      state.minimized = !state.minimized
    },
    playEpisode(state, action: PayloadAction<{ podcastId: string; episode: IEpisode }>) {
      const { podcastId, episode } = action.payload
      state.currentTime = 0
      state.podcastId = podcastId
      state.playingEpisode = episode
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload
    },
    setVolume(state, action) {
      state.volume = action.payload
    },
    play(state) {
      state.isPlaying = true
    },
    pause(state) {
      state.isPlaying = false
    },
  },
})

export const { playEpisode, setCurrentTime, setVolume, play, pause, toggleMinimize } = playingPodcastSlice.actions

export default playingPodcastSlice.reducer
