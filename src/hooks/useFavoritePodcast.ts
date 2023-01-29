import { useDispatch } from 'react-redux'

import { clientApi } from '@/api'
import { toggleFavoritePodcast as toggleFavoritePodcastInDiscover } from '@/store/discoverPodcasts/discoverPodcastsSlice'
import { addFavorite, removeFavoriteById } from '@/store/favorites/favoritesSlice'
import {
  toggleFavoritePodcastInRecommendations,
  toggleFavoritePodcast as toggleFavoritePodcastInDetails,
} from '@/store/podcast/podcastSlice'
import { toggleFavoritePodcast as toggleFavoritePodcastInHome } from '@/store/podcasts/podcastsSlice'

type UseFavoritePodcastProps = {
  isFavorite?: boolean
  id: string
}

const useFavoritePodcast = ({ isFavorite = false, id }: UseFavoritePodcastProps) => {
  const dispatch = useDispatch()

  const toggleFavoritePodcast = () => {
    dispatch(toggleFavoritePodcastInHome(id))
    dispatch(toggleFavoritePodcastInDiscover(id))
    dispatch(toggleFavoritePodcastInRecommendations(id))
    dispatch(toggleFavoritePodcastInDetails(id))
  }

  const addOrRemoveFavorite = async () => {
    toggleFavoritePodcast()

    if (isFavorite) {
      const { error } = await clientApi.podcasts.removePodcastFromFavorites(id)
      if (error) return toggleFavoritePodcast()
      dispatch(removeFavoriteById(id))
    } else {
      const { data, error } = await clientApi.podcasts.addPodcastToFavorites(id)
      if (error) return toggleFavoritePodcast()
      if (data) dispatch(addFavorite(data))
    }
  }

  return {
    addOrRemoveFavorite,
    isFavorite,
  }
}

export default useFavoritePodcast
