import { GetServerSideProps } from 'next'
import { withAuth } from '../../helpers/auth'
import ResetPassword from '../../views/ResetPassword'

export default ResetPassword

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user }) => {
    if (user) return { redirect: { destination: '/', permanent: false } }
    return { props: {} }
  },
})
