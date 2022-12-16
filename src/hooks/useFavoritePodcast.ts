import { useState } from 'react'
import { useDispatch } from 'react-redux'
import api from '../api/api'
import { addFavorite, removeFavoriteById } from '../store/favorites/favoritesSlice'
import { toggleFavoritePodcast } from '../store/podcasts/podcastsSlice'
import { toggleFavoritePodcast as toggleFavoritePodcastInDiscover } from '../store/discoverPodcasts/discoverPodcastsSlice'
import { toggleFavoritePodcastInRecommendations } from '../store/podcast/podcastSlice'

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
  }

  const addOrRemoveFavorite = async () => {
    try {
      updateFavoritePodcast()

      if (isFavorite) {
        await api.removePodcastFromFavorites(id)
        dispatch(removeFavoriteById(id))
      } else {
        const { data } = await api.addPodcastToFavorites(id)
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
