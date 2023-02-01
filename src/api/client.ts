import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponseHeaders } from 'axios'

interface ApiError {
  message: string
  statusCode: number
}

interface RequestConfig {
  headers?: AxiosRequestHeaders
}

interface ResultSuccess<T> {
  data: T
  error: null
  headers: AxiosResponseHeaders
}

interface ResultError {
  data: null
  error: ApiError
  headers: AxiosResponseHeaders
}

type Result<T> = ResultSuccess<T> | ResultError

export class ApiClient {
  private readonly httpClient: AxiosInstance

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
      withCredentials: true,
    })
  }

  private handleError(error: unknown) {
    if (!axios.isAxiosError(error) || !error.response) throw error
    const data = error.response.data
    return { data: null, error: data as ApiError, headers: error.response.headers }
  }

  private getRequestConfig(config?: RequestConfig): AxiosRequestConfig | undefined {
    if (!config) return
    return {
      headers: { ...this.httpClient.defaults.headers.common, ...config.headers },
    }
  }

  async setAuthorizationToken(token: string) {
    this.httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  async get<T>(url: string, config?: RequestConfig): Promise<Result<T>> {
    try {
      const { data, headers } = await this.httpClient.get<T>(url, this.getRequestConfig(config))
      return { data, error: null, headers }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<Result<T>> {
    try {
      const { data, headers } = await this.httpClient.delete<T>(url, this.getRequestConfig(config))
      return { data, error: null, headers }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async post<T>(url: string, body?: unknown, config?: RequestConfig): Promise<Result<T>> {
    try {
      const { data, headers } = await this.httpClient.post<T>(url, body, this.getRequestConfig(config))

      return { data, error: null, headers }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async patch<T>(url: string, body?: unknown, config?: RequestConfig): Promise<Result<T>> {
    try {
      const { data, headers } = await this.httpClient.patch<T>(url, body, this.getRequestConfig(config))

      return { data, error: null, headers }
    } catch (error) {
      return this.handleError(error)
    }
  }
}
