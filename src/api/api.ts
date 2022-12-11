import { AxiosResponse } from 'axios'
import client from './client'

export { default as client } from './client'

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
  client.get<any, AxiosResponse<IBestPodcasts>>(`/podcasts/best?page=${page}`)

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
  client.get<any, AxiosResponse<ICuratedPodcasts>>(`/podcasts/curated?page=${page}`)

export interface IPodcastDetails extends IPodcast {
  episodes: IEpisode[]
  next_episode_pub_date: number
  total_episodes: number
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
    `/podcasts/${podcastId}?nextEpisodePubDate=${nextEpisodePubDate}`,
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
  client.get<any, AxiosResponse<ITypeahead>>(`/podcasts/typeahead?q=${searchTerm}`)

export interface ITokensResponse {
  accessToken: string
  refreshToken: string
}

export interface IFavoritePodcast {
  id: number
  podcast: {
    id: string
    thumbnail: string
    title: string
    publisher: string
  }
}

export const fetchFavoritePodcasts = () =>
  client.get<any, AxiosResponse<IFavoritePodcast[]>>('/podcasts/favorites')

export const addPodcastToFavorites = (id: string) => client.post(`/podcasts/favorites/${id}`)

export const removePodcastFromFavorites = (id: string) => client.delete(`/podcasts/favorites/${id}`)

const api = {
  fetchBestPodcasts,
  fetchCuratedPodcasts,
  fetchPodcast,
  fetchRecommendations,
  fetchEpisodes,
  fetchTypeahead,
  fetchFavoritePodcasts,
  addPodcastToFavorites,
  removePodcastFromFavorites,
}

export default api
