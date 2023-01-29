import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import discoverPodcastsReducer from './discoverPodcasts/discoverPodcastsSlice'
import favoritesReducer from './favorites/favoritesSlice'
import playingPodcastReducer from './playingPodcast/playingPodcastSlice'
import podcastReducer from './podcast/podcastSlice'
import podcastsReducer from './podcasts/podcastsSlice'

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  auth: authReducer,
  podcasts: podcastsReducer,
  discoverPodcasts: discoverPodcastsReducer,
  favorites: favoritesReducer,
  podcast: podcastReducer,
  playingPodcast: playingPodcastReducer,
})

export default rootReducer
