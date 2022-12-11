import type { GetServerSideProps } from 'next'
import api from '../api/api'
import { getAuthUser } from '../helpers/auth'
import { wrapper } from '../store'
import { setMe } from '../store/auth/authSlice'
import { setPodcasts } from '../store/podcasts/podcastsSlice'
import Home from '../views/Home'

export default Home

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async ctx => {
    const user = await getAuthUser(ctx)
    const { data } = await api.fetchBestPodcasts(1)
    store.dispatch(setMe(user))
    store.dispatch(setPodcasts(data))

    return {
      props: {},
    }
  },
)
