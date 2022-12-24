import type { GetServerSideProps } from 'next'
import { podcastsApi } from '../api'
import { withAuth } from '@/helpers/auth'
import { setPodcastLists } from '@/store/discoverPodcasts/discoverPodcastsSlice'
import Discover from '../views/Discover'

export default Discover

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ store, accessToken }) => {
    const { data } = await podcastsApi.fetchCuratedPodcasts(1, accessToken)
    store.dispatch(setPodcastLists(data))
    return { props: {} }
  },
})
