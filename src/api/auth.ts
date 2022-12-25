import { AxiosResponse } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { Me } from '@/store/auth/authSlice'
import client from './client'

export interface ITokensResponse {
  accessToken: string
  refreshToken: string
}

export interface ISignUpBody extends ISignInBody {
  fullName: string
}

export const signUp = (body: ISignUpBody) =>
  client.post<any, AxiosResponse<Me>>('/auth/sign-up', body)

export interface ISignInBody {
  email: string
  password: string
}

export const signIn = (body: ISignInBody) =>
  client.post<any, AxiosResponse<Me>>('/auth/sign-in', body)

export const signOut = () => client.post('/auth/sign-out')

export const refresh = (token?: string) =>
  client.post<any, AxiosResponse<ITokensResponse>>('/auth/refresh', undefined, {
    headers: { Authorization: `Bearer ${token}` },
    skipAuthRefresh: true,
  })

export const me = (token?: string) =>
  client.get<any, AxiosResponse<Me>>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

export interface IForgotPasswordBody {
  email: string
}

export const forgotPassword = (body: IForgotPasswordBody) =>
  client.post<AxiosResponse<{ message: string }>, AxiosResponse<{ mes: string }>>(
    '/auth/forgot-password',
    body,
  )

export interface IResetPasswordBody {
  password: string
}

export const resetPassword = (resetToken: string, body: IResetPasswordBody) =>
  client.post(`/auth/reset-password/${resetToken}`, body)

interface IResetPasswordUserResponse {
  fullName: string
}

export const fetchResetPasswordUser = (resetToken: string) =>
  client.get<any, AxiosResponse<IResetPasswordUserResponse>>(`/auth/reset-password/${resetToken}`)

interface IChangePasswordBody {
  currentPassword: string
  password: string
}

export const changePassword = (body: IChangePasswordBody) =>
  client.post('/auth/change-password', body)

interface IUpdateUserBody {
  fullName: string
}

export const updateUser = (body: IUpdateUserBody) =>
  client.patch<any, AxiosResponse<Me>>('/auth/update-user', body)

const refreshAuthLogic = async (failedRequest: any) => {
  // console.log(failedRequest)
  console.log('refresh auth logic')

  return refresh().then(res => {
    const cookie = res.headers['set-cookie']
    failedRequest.response.config.headers['set-cookie'] = cookie
    // console.log({ failedRequest, cookie })
    return Promise.resolve()
  })
  // .catch(console.log)
}

createAuthRefreshInterceptor(client, refreshAuthLogic)
