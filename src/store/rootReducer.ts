import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import podcastsReducer from './podcasts/podcastsSlice'
import discoverPodcastsReducer from './discoverPodcasts/discoverPodcastsSlice'
import playingPodcastReducer from './playingPodcast/playingPodcastSlice'
import favoritesReducer from './favorites/favoritesSlice'

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  auth: authReducer,
  podcasts: podcastsReducer,
  discoverPodcasts: discoverPodcastsReducer,
  favorites: favoritesReducer,
  playingPodcast: playingPodcastReducer,
})

export default rootReducer
