import { ApiClient } from './client'
import { AuthApi } from './auth'
import { PodcastsApi } from './podcasts'

export class Api {
  private readonly client: ApiClient
  readonly auth: AuthApi
  readonly podcasts: PodcastsApi

  constructor() {
    this.client = new ApiClient('http://localhost:3000/api/v1/')
    this.auth = new AuthApi(this.client)
    this.podcasts = new PodcastsApi(this.client)
  }

  setAuthorizationToken(token: string) {
    this.client.setAuthorizationToken(token)
  }
}

export const clientApi = new Api()
