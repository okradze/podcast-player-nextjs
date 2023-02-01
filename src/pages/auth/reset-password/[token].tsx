import { GetServerSideProps } from 'next'

import { withAuth } from '@/helpers/auth'
import ResetPassword from '@/views/Auth/ResetPassword'

export default ResetPassword

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ user, ctx, api }) => {
    const token = ctx.params?.token
    if (!token || typeof token !== 'string' || user) return { redirect: { destination: '/', permanent: false } }
    const { data, error } = await api.auth.fetchResetPasswordUser(token)

    if (error) return { props: { isTokenExpired: true } }

    return {
      props: {
        fullName: data.fullName,
      },
    }
  },
})
