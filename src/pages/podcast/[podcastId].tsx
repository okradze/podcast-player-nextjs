import { GetServerSideProps } from 'next'
import api from '../../api/api'
import { withAuth } from '../../helpers/auth'
import { setPodcast, setRecommendations } from '../../store/podcast/podcastSlice'
import Podcast from '../../views/Podcast'

export default Podcast

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ store, ctx, accessToken }) => {
    const { params } = ctx
    const podcastId = params?.podcastId
    if (!podcastId || typeof podcastId !== 'string') return { props: {} }

    const [podcast, recommendations] = await Promise.all([
      api.fetchPodcast(podcastId),
      api.fetchRecommendations(podcastId, accessToken),
    ])

    store.dispatch(setPodcast(podcast.data))
    store.dispatch(setRecommendations(recommendations.data.recommendations))

    return {
      props: {},
    }
  },
})
