import type { GetServerSideProps } from 'next'
import api from '../api/api'
import { withAuth } from '../helpers/auth'
import { setFavorites } from '../store/favorites/favoritesSlice'
import Favorites from '../views/Favorites'

export default Favorites

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ accessToken, store }) => {
    const { data } = await api.fetchFavoritePodcasts(accessToken)
    store.dispatch(setFavorites(data))
    return { props: {} }
  },
  redirect: true,
})
