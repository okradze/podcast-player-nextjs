import { Me } from '@/store/auth/authSlice'
import { ApiClient } from './client'

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

  forgotPassword(body: IForgotPasswordBody) {
    return this.client.post('/auth/forgot-password', body)
  }

  resetPassword(resetToken: string, body: IResetPasswordBody) {
    return this.client.post(`/auth/reset-password/${resetToken}`, body)
  }

  fetchResetPasswordUser(resetToken: string) {
    return this.client.get<IResetPasswordUserResponse>(`/auth/reset-password/${resetToken}`)
  }

  changePassword(body: IChangePasswordBody) {
    return this.client.post('/auth/change-password', body)
  }

  updateUser(body: IUpdateUserBody) {
    return this.client.patch<Me>('/auth/update-user', body)
  }
}

interface ITokensResponse {
  accessToken: string
  refreshToken: string
}

interface ISignUpBody extends ISignInBody {
  fullName: string
}

interface ISignInBody {
  email: string
  password: string
}

interface IForgotPasswordBody {
  email: string
}

interface IResetPasswordBody {
  password: string
}

interface IResetPasswordUserResponse {
  fullName: string
}

interface IChangePasswordBody {
  currentPassword: string
  password: string
}

interface IUpdateUserBody {
  fullName: string
}

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
