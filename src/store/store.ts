import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from './rootReducer'

const makeStore = () => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    return configureStore({
      reducer: rootReducer,
    })
  }

  const {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } = require('redux-persist')
  const storage = require('redux-persist/lib/storage').default

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['playingPodcast'],
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

  //@ts-ignore
  store.__persistor = persistStore(store)
  return store
}

export const wrapper = createWrapper(makeStore)
