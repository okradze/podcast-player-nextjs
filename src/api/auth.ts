import { AxiosResponse } from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import client from './client'
import { Me } from '../store/auth/authSlice'

export interface ISignupBody extends ISigninBody {
  fullName: string
}

export const signup = (body: ISignupBody) =>
  client.post<any, AxiosResponse<Me>>('/auth/signup', body)

export interface ISigninBody {
  email: string
  password: string
}

export const signin = (body: ISigninBody) =>
  client.post<any, AxiosResponse<Me>>('/auth/signin', body)

export const signout = () => client.post('/auth/signout')

export const refresh = () => client.post('/auth/refresh', undefined, { skipAuthRefresh: true })

export const me = (token?: string) =>
  client.get<any, AxiosResponse<Me>>('/auth/me', { headers: { Authorization: `Bearer ${token}` } })

const refreshAuthLogic = async (failedRequest: any) =>
  refresh().then(res => {
    const cookie = res.headers['set-cookie']
    failedRequest.response.config.headers['set-cookie'] = cookie
    // console.log({ failedRequest, cookie })
    return Promise.resolve()
  })

// createAuthRefreshInterceptor(client, refreshAuthLogic)
