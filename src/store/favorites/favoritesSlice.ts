import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IPodcast } from '../../api/api'

export interface FavoritesState {
  podcasts: IPodcast[]
}

export const initialState: FavoritesState = {
  podcasts: [],
}

export const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<IPodcast[]>) {
      state.podcasts = [...state.podcasts, ...action.payload]
    },
    removeFavoriteById(state, action: PayloadAction<string>) {
      const index = state.podcasts.findIndex(podcast => podcast.id === action.payload)

      if (index > -1) {
        state.podcasts.splice(index, 1)
      }
    },
    addFavorite(state, action: PayloadAction<IPodcast>) {
      state.podcasts.unshift(action.payload)
    },
    reset() {
      return { ...initialState }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        podcasts: action.payload.favorites.podcasts,
      }
    },
  },
})

export const { setFavorites, reset, addFavorite, removeFavoriteById } = podcastsSlice.actions

export default podcastsSlice.reducer
