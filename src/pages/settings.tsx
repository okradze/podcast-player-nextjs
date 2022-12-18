import type { GetServerSideProps } from 'next'
import { podcastsApi } from '../api'
import { withAuth } from '../helpers/auth'
import { setPodcasts } from '../store/podcasts/podcastsSlice'
import Settings from '../views/Settings'

export default Settings

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user }) => {
    if (!user) return { redirect: { destination: '/', permanent: false } }
    return { props: {} }
  },
})
