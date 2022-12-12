import { GetServerSideProps } from 'next'
import { withAuth } from '../../helpers/auth'
import SignIn from '../../views/SignIn'

export default SignIn

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user }) => {
    if (user) return { redirect: { destination: '/', permanent: false } }
    return { props: {} }
  },
})
