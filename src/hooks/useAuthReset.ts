import { useDispatch } from 'react-redux'

import { reset as resetAuth } from '@/store/auth/authSlice'
import { reset as resetDiscoverPodcasts } from '@/store/discoverPodcasts/discoverPodcastsSlice'
import { reset as resetFavorites } from '@/store/favorites/favoritesSlice'
import { reset as resetPodcasts } from '@/store/podcasts/podcastsSlice'

const useAuthReset = () => {
  const dispatch = useDispatch()

  const reset = () => {
    dispatch(resetAuth())
    dispatch(resetPodcasts())
    dispatch(resetDiscoverPodcasts())
    dispatch(resetFavorites())
  }

  return reset
}

export default useAuthReset
