import type { GetServerSideProps } from 'next'
import { podcastsApi } from '@/api'
import { withAuth } from '@/helpers/auth'
import { setFavorites } from '@/store/favorites/favoritesSlice'
import Favorites from '@/views/Favorites'

export default Favorites

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user, accessToken, store }) => {
    if (!user) return { redirect: { destination: '/', permanent: false } }

    const { data } = await podcastsApi.fetchFavoritePodcasts(accessToken)
    store.dispatch(setFavorites(data))
    return { props: {} }
  },
})
