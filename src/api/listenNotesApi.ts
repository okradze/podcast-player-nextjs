import axios, { AxiosResponse } from 'axios'

const client = axios.create({
  baseURL: 'https://listen-api.listennotes.com/api/v2',
  headers: {
    'X-ListenAPI-Key': process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY || '',
  },
})

export interface IPodcast {
  id: string
  thumbnail: string
  title: string
  publisher: string
  description: string
}

export interface IBestPodcasts {
  podcasts: IPodcast[]
  has_next: boolean
  page_number: number
}

export const fetchBestPodcasts = (page: number) =>
  client.get<any, AxiosResponse<IBestPodcasts>>(`/best_podcasts?page=${page}`)

export interface ICuratedPodcastList {
  id: string
  title: string
  podcasts: IPodcast[]
}

export interface ICuratedPodcasts {
  curated_lists: ICuratedPodcastList[]
  has_next: boolean
  page_number: number
}

export const fetchCuratedPodcasts = (page: number) =>
  client.get<any, AxiosResponse<ICuratedPodcasts>>(`curated_podcasts?page=${page}`)

export const fetchPodcast = (podcastId: string) =>
  client.get<any, AxiosResponse<IPodcast>>(`/podcasts/${podcastId}`)

export interface IRecommendations {
  recommendations: IPodcast[]
}

export const fetchRecommendations = (podcastId: string) =>
  client.get<any, AxiosResponse<IRecommendations>>(
    `/podcasts/${podcastId}/recommendations`,
  )

export const fetchEpisodes = (podcastId: string, nextEpisodePubDate: number) =>
  client.get<any, AxiosResponse<any>>(
    `/podcasts/${podcastId}?next_episode_pub_date=${nextEpisodePubDate}`,
  )

const listenNotesApi = {
  fetchBestPodcasts,
  fetchCuratedPodcasts,
  fetchPodcast,
  fetchRecommendations,
  fetchEpisodes,
}

export default listenNotesApi
