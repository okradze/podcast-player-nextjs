import { useDispatch } from 'react-redux'
import { podcastsApi } from '../api'
import { addFavorite, removeFavoriteById } from '../store/favorites/favoritesSlice'
import { toggleFavoritePodcast } from '../store/podcasts/podcastsSlice'
import { toggleFavoritePodcast as toggleFavoritePodcastInDiscover } from '../store/discoverPodcasts/discoverPodcastsSlice'
import {
  toggleFavoritePodcastInRecommendations,
  toggleFavoritePodcast as toggleFavoriteInPodcastDetails,
} from '../store/podcast/podcastSlice'

type UseFavoritePodcastProps = {
  isFavorite?: boolean
  id: string
}

const useFavoritePodcast = ({ isFavorite = false, id }: UseFavoritePodcastProps) => {
  const dispatch = useDispatch()

  const updateFavoritePodcast = () => {
    dispatch(toggleFavoritePodcast(id))
    dispatch(toggleFavoritePodcastInDiscover(id))
    dispatch(toggleFavoritePodcastInRecommendations(id))
    dispatch(toggleFavoriteInPodcastDetails(id))
  }

  const addOrRemoveFavorite = async () => {
    try {
      updateFavoritePodcast()

      if (isFavorite) {
        await podcastsApi.removePodcastFromFavorites(id)
        dispatch(removeFavoriteById(id))
      } else {
        const { data } = await podcastsApi.addPodcastToFavorites(id)
        dispatch(addFavorite(data))
      }
    } catch (error) {
      updateFavoritePodcast()
    }
  }

  return {
    addOrRemoveFavorite,
    isFavorite,
  }
}

export default useFavoritePodcast
