import type { GetServerSideProps } from 'next'
import api from '../api/api'
import { wrapper } from '../store'
import { setPodcastLists } from '../store/discoverPodcasts/discoverPodcastsSlice'
import Discover from '../views/Discover'

export default Discover

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    const { data } = await api.fetchCuratedPodcasts(1)
    store.dispatch(setPodcastLists(data))

    return {
      props: {},
    }
  },
)
