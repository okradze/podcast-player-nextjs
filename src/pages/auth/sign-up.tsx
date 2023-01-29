import { GetServerSideProps } from 'next'

import { withAuth } from '@/helpers/auth'
import SignUp from '@/views/Auth/SignUp'

export default SignUp

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user }) => {
    if (user) return { redirect: { destination: '/', permanent: false } }
    return { props: {} }
  },
})
