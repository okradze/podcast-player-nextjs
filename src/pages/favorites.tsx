import type { GetServerSideProps } from 'next'
import { withAuth } from '@/helpers/auth'
import { setFavorites } from '@/store/favorites/favoritesSlice'
import Favorites from '@/views/Favorites'

export default Favorites

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user, api, store }) => {
    if (!user) return { redirect: { destination: '/', permanent: false } }

    const { data } = await api.podcasts.fetchFavoritePodcasts()
    if (data) store.dispatch(setFavorites(data))

    return { props: {} }
  },
})
