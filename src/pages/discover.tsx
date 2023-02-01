import type { GetServerSideProps } from 'next'

import { withAuth } from '@/helpers/auth'
import { setPodcastLists } from '@/store/discoverPodcasts/discoverPodcastsSlice'
import Discover from '@/views/Discover'

export default Discover

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ store, api }) => {
    const { data } = await api.podcasts.fetchCuratedPodcasts(1)
    if (data) store.dispatch(setPodcastLists(data))
    return { props: {} }
  },
})
