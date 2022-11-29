import type { GetServerSideProps } from 'next'
import api from '../api/api'
import Discover from '../views/Discover'
import type { DiscoverProps } from '../views/Discover/Discover'

export default Discover

export const getServerSideProps: GetServerSideProps<DiscoverProps> = async () => {
  const { data } = await api.fetchCuratedPodcasts(1)

  return {
    props: {
      initialLists: data,
    },
  }
}
