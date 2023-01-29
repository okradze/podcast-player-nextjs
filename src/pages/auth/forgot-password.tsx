import { GetServerSideProps } from 'next'

import { withAuth } from '@/helpers/auth'
import ForgotPassword from '@/views/Auth/ForgotPassword'

export default ForgotPassword

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user }) => {
    if (user) return { redirect: { destination: '/', permanent: false } }
    return { props: {} }
  },
})
