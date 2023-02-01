import { AuthApi } from './auth'
import { ApiClient } from './client'
import { PodcastsApi } from './podcasts'
import config from '@/config'

export class Api {
  private readonly client: ApiClient
  readonly auth: AuthApi
  readonly podcasts: PodcastsApi

  constructor() {
    this.client = new ApiClient(config.apiUrlV1)
    this.auth = new AuthApi(this.client)
    this.podcasts = new PodcastsApi(this.client)
  }

  setAuthorizationToken(token: string) {
    this.client.setAuthorizationToken(token)
  }
}

export const clientApi = new Api()
