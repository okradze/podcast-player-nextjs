import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth/authSlice'
import podcastsReducer from './podcasts/podcastsSlice'
import discoverPodcastsReducer from './discoverPodcasts/discoverPodcastsSlice'
import playingPodcastReducer from './playingPodcast/playingPodcastSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['playingPodcast'],
}

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  auth: authReducer,
  podcasts: podcastsReducer,
  discoverPodcasts: discoverPodcastsReducer,
  playingPodcast: playingPodcastReducer,
})

export default persistReducer(persistConfig, rootReducer)
