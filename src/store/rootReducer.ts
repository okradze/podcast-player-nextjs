import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import podcastsReducer from './podcasts/podcastsSlice'
import discoverPodcastsReducer from './discoverPodcasts/discoverPodcastsSlice'
import favoritesReducer from './favorites/favoritesSlice'
import podcastReducer from './podcast/podcastSlice'
import playingPodcastReducer from './playingPodcast/playingPodcastSlice'

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
