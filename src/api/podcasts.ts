import { ApiClient } from './client'

export class PodcastsApi {
  constructor(private readonly client: ApiClient) {}

  fetchBestPodcasts(page: number) {
    return this.client.get<IBestPodcasts>(`/podcasts/best?page=${page}`)
  }

  fetchCuratedPodcasts(page: number) {
    return this.client.get<ICuratedPodcasts>(`/podcasts/curated?page=${page}`)
  }

  fetchPodcast(podcastId: string) {
    return this.client.get<IPodcastDetails>(`/podcasts/${podcastId}`)
  }

  fetchRecommendations(podcastId: string) {
    return this.client.get<IRecommendations>(`/podcasts/${podcastId}/recommendations`)
  }

  fetchEpisodes(podcastId: string, nextEpisodePubDate: number) {
    return this.client.get<IPodcastDetails>(`/podcasts/${podcastId}?nextEpisodePubDate=${nextEpisodePubDate}`)
  }

  fetchTypeahead(searchTerm: string) {
    return this.client.get<ITypeahead>(`/podcasts/typeahead?q=${searchTerm}`)
  }
  fetchFavoritePodcasts() {
    return this.client.get<IPodcast[]>('/podcasts/favorites')
  }

  addPodcastToFavorites(id: string) {
    return this.client.post<IPodcast>(`/podcasts/favorites/${id}`)
  }

  removePodcastFromFavorites(id: string) {
    return this.client.delete(`/podcasts/favorites/${id}`)
  }
}

export interface IPodcast {
  id: string
  thumbnail: string
  title: string
  publisher: string
  isFavorite?: boolean
}

export interface IBestPodcasts {
  podcasts: IPodcast[]
  has_next: boolean
  page_number: number
}

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

export interface IPodcastDetails extends IPodcast {
  episodes: IEpisode[]
  description: string
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

export interface IRecommendations {
  recommendations: IPodcast[]
}

export interface ITypeahead {
  podcasts: ITypeaheadPodcast[]
}

export interface ITypeaheadPodcast {
  id: string
  title_original: string
  publisher_original: string
  thumbnail: string
}
