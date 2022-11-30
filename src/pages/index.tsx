import type { GetServerSideProps } from 'next'
import api from '../api/api'
import { wrapper } from '../store'
import { setPodcasts } from '../store/podcasts/podcastsSlice'
import Home from '../views/Home'

export default Home

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async () => {
    const { data } = await api.fetchBestPodcasts(1)
    store.dispatch(setPodcasts(data))

    return {
      props: {},
    }
  },
)
