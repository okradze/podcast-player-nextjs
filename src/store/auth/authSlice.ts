import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Me {
  id: number
  fullName: string
  email: string
}

export interface AuthState {
  me?: Me
}

export const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMe(state, action: PayloadAction<Me>) {
      state.me = action.payload
    },
    reset(state) {
      state = initialState
    },
  },
})

export const { setMe, reset } = authSlice.actions

export default authSlice.reducer
