import { AuthApi } from './auth'
import { ApiClient } from './client'

export class Api {
  private readonly client: ApiClient
  readonly auth: AuthApi

  constructor() {
    this.client = new ApiClient('http://localhost:3000/api/v1/')
    this.auth = new AuthApi(this.client)
  }

  setAuthorizationToken(token: string) {
    this.client.setAuthorizationToken(token)
  }
}

export const clientApi = new Api()
