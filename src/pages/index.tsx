import type { GetServerSideProps } from 'next'
import api from '../api/api'
import { withAuth } from '../helpers/auth'
import { setPodcasts } from '../store/podcasts/podcastsSlice'
import Home from '../views/Home'

export default Home

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ store, accessToken }) => {
    try {
      const { data } = await api.fetchBestPodcasts(1, accessToken)
      store.dispatch(setPodcasts(data))
    } catch (error) {}

    return { props: {} }
  },
})
