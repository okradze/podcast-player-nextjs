import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITokensResponse } from '../../api/api'

export interface Me {
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
    setAuthTokens(state, action: PayloadAction<ITokensResponse>) {
      const { accessToken, refreshToken } = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
  },
})

export const { setMe, setAuthTokens } = authSlice.actions

export default authSlice.reducer
