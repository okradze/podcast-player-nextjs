import type { GetServerSideProps } from 'next'

import { withAuth } from '@/helpers/auth'
import { setPodcasts } from '@/store/podcasts/podcastsSlice'
import Home from '@/views/Home'

export default Home

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ store, api }) => {
    const { data } = await api.podcasts.fetchBestPodcasts(1)
    if (data) store.dispatch(setPodcasts(data))
    return { props: {} }
  },
})
