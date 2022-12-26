import axios, { AxiosInstance } from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  withCredentials: true,
})

export default client

interface ApiError {
  message: string
  statusCode: number
}

export class ApiClient {
  private readonly httpClient: AxiosInstance

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
      withCredentials: true,
    })
  }

  private handleError(error: unknown) {
    if (!axios.isAxiosError(error)) throw error
    const data = error.response?.data
    if (data) return { data: undefined, error: data as ApiError }
    throw error
  }

  async setAuthorizationToken(token: string) {
    this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  async get<T>(url: string) {
    try {
      const { data } = await this.httpClient.get<T>(url)
      return { data, error: null }
    } catch (error) {
      return this.handleError(error)
    }
  }
}
