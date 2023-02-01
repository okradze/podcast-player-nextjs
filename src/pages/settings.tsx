import type { GetServerSideProps } from 'next'

import { withAuth } from '@/helpers/auth'
import Settings from '@/views/Settings'

export default Settings

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user }) => {
    if (!user) return { redirect: { destination: '/', permanent: false } }
    return { props: {} }
  },
})
