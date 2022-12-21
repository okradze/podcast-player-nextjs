import { GetServerSideProps } from 'next'
import { authApi } from '../../../api'
import { withAuth } from '../../../helpers/auth'
import ResetPassword from '../../../views/ResetPassword'

export default ResetPassword

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user, ctx }) => {
    const token = ctx.params?.token
    if (!token || typeof token !== 'string' || user)
      return { redirect: { destination: '/', permanent: false } }

    try {
      const { data } = await authApi.fetchResetPasswordUser(token)
      return { props: data }
    } catch (error) {
      return { props: { isTokenExpired: true } }
    }
  },
})
