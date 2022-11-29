import type { GetServerSideProps } from 'next'
import api from '../api/api'
import Home from '../views/Home'
import type { HomeProps } from '../views/Home/Home'

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { data } = await api.fetchBestPodcasts(1)

  return {
    props: {
      initialPodcasts: data,
    },
  }
}
