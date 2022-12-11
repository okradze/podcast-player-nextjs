import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import api, { IBestPodcasts, IFavoritePodcast, IPodcast } from '../../api/api'

export interface FavoritesState {
  podcasts: IFavoritePodcast[]
}

export const initialState: FavoritesState = {
  podcasts: [],
}

export const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<IFavoritePodcast[]>) {
      state.podcasts = [...state.podcasts, ...action.payload]
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (state.podcasts.length > 0) return state

      return {
        ...state,
        podcasts: action.payload.favorites.podcasts,
      }
    },
  },
})

export const { setFavorites } = podcastsSlice.actions

export default podcastsSlice.reducer
