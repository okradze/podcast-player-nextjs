import { AxiosResponse } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { Me } from '@/store/auth/authSlice'
import client, { ApiClient } from './client'

export class AuthApi {
  constructor(private readonly client: ApiClient) {}

  signUp(body: ISignUpBody) {
    return this.client.post<Me>('/auth/sign-up', body)
  }

  signIn(body: ISignInBody) {
    return this.client.post<Me>('/auth/sign-in', body)
  }

  signOut() {
    return this.client.post('/auth/sign-out')
  }

  me() {
    return this.client.get<Me>('/auth/me')
  }

  refresh(refreshToken: string) {
    return this.client.post<ITokensResponse>('/auth/refresh', undefined, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    })
  }
}

export interface ITokensResponse {
  accessToken: string
  refreshToken: string
}

export interface ISignUpBody extends ISignInBody {
  fullName: string
}

export interface ISignInBody {
  email: string
  password: string
}

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

// const refreshAuthLogic = async (failedRequest: any) => {
//   // console.log(failedRequest)
//   console.log('refresh auth logic')

//   return refresh().then(res => {
//     const cookie = res.headers['set-cookie']
//     failedRequest.response.config.headers['set-cookie'] = cookie
//     // console.log({ failedRequest, cookie })
//     return Promise.resolve()
//   })
//   // .catch(console.log)
// }

// createAuthRefreshInterceptor(client, refreshAuthLogic)
