import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export interface Me {
  id: number
  fullName: string
  email: string
}

export interface AuthState {
  me: Me | null
}

export const initialState: AuthState = { me: null }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMe(state, action: PayloadAction<Me | null>) {
      state.me = action.payload
    },
    reset(state) {
      state = initialState
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        me: action.payload.auth.me,
      }
    },
  },
})

export const { setMe, reset } = authSlice.actions

export default authSlice.reducer
