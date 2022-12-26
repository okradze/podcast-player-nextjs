import { GetServerSideProps } from 'next'
import { clientApi } from '@/api'
import { withAuth } from '@/helpers/auth'
import { setPodcast, setRecommendations } from '@/store/podcast/podcastSlice'
import Podcast from '@/views/Podcast'

export default Podcast

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ store, ctx }) => {
    const { params } = ctx
    const podcastId = params?.podcastId
    if (!podcastId || typeof podcastId !== 'string') return { props: {} }

    const [podcast, recommendations] = await Promise.all([
      clientApi.podcasts.fetchPodcast(podcastId),
      clientApi.podcasts.fetchRecommendations(podcastId),
    ])

    if (podcast.data) store.dispatch(setPodcast(podcast.data))
    if (recommendations.data)
      store.dispatch(setRecommendations(recommendations.data.recommendations))

    return {
      props: {},
    }
  },
})
