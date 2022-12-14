import axios, { AxiosResponse } from 'axios'

if (!process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY)
  throw new Error('NEXT_PUBLIC_LISTEN_NOTES_API_KEY is not configured in .env.local')

const client = axios.create({
  baseURL: 'https://listen-api.listennotes.com/api/v2',
  headers: {
    'X-ListenAPI-Key': process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY,
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

export interface IPodcastDetails extends IPodcast {
  episodes: IEpisode[]
  next_episode_pub_date: number
}

export interface IEpisode {
  id: string
  title: string
  thumbnail: string
  audio: string
  audio_length_sec: number
}

export const fetchPodcast = (podcastId: string) =>
  client.get<any, AxiosResponse<IPodcastDetails>>(`/podcasts/${podcastId}`)

export interface IRecommendations {
  recommendations: IPodcast[]
}

export const fetchRecommendations = (podcastId: string) =>
  client.get<any, AxiosResponse<IRecommendations>>(`/podcasts/${podcastId}/recommendations`)

export const fetchEpisodes = (podcastId: string, nextEpisodePubDate: number) =>
  client.get<any, AxiosResponse<IPodcastDetails>>(
    `/podcasts/${podcastId}?next_episode_pub_date=${nextEpisodePubDate}`,
  )

export interface ITypeahead {
  podcasts: ITypeaheadPodcast[]
}

export interface ITypeaheadPodcast {
  id: string
  title_original: string
  publisher_original: string
  thumbnail: string
}

export const fetchTypeahead = (searchTerm: string) =>
  client.get<any, AxiosResponse<ITypeahead>>(`/typeahead?q=${searchTerm}&show_podcasts=1`)

const listenNotesApi = {
  fetchBestPodcasts,
  fetchCuratedPodcasts,
  fetchPodcast,
  fetchRecommendations,
  fetchEpisodes,
  fetchTypeahead,
}

export default listenNotesApi
