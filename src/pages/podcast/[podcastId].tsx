import { GetServerSideProps } from 'next'
import api from '../../api/api'
import { withAuth } from '../../helpers/auth'
import Podcast from '../../views/Podcast'
import type { PodcastProps } from '../../views/Podcast/Podcast'

export default Podcast

export const getServerSideProps: GetServerSideProps<PodcastProps> = withAuth({
  callback: async ({ ctx }) => {
    const { params } = ctx
    const podcastId = params?.podcastId
    if (!podcastId || typeof podcastId !== 'string') return { props: {} }

    const [podcast, recommendations] = await Promise.all([
      api.fetchPodcast(podcastId),
      api.fetchRecommendations(podcastId),
    ])

    return {
      props: {
        initialPodcast: podcast.data,
        recommendations: recommendations.data.recommendations,
      },
    }
  },
})
