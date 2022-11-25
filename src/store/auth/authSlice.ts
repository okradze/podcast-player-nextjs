import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Me {
  id: number
  fullName: string
  email: string
}

export interface AuthState {
  me?: Me
  accessToken?: string
  refreshToken?: string
}

export const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMe(state, action: PayloadAction<Me>) {
      state.me = action.payload
    },
  },
})

export const { setMe } = authSlice.actions

export default authSlice.reducer
