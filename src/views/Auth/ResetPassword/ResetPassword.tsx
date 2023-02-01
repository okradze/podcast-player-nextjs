import { NextPage } from 'next'
import { useRouter } from 'next/router'

import ResetLinkExpired from './components/ResetLinkExpired'
import ResetPasswordForm from './components/ResetPasswordForm'
import AuthLayout from '@/components/AuthLayout'

export type ResetPasswordProps = {
  isTokenExpired?: boolean
  fullName?: string
}

const ResetPassword: NextPage = ({ isTokenExpired, fullName }: ResetPasswordProps) => {
  const router = useRouter()
  const { token } = router.query

  if (!token || typeof token !== 'string' || isTokenExpired) return <ResetLinkExpired />

  return (
    <AuthLayout
      pageTitle='Reset Password - Podcast Player'
      title={`Hello ${fullName || ''}`}
      subtitle='Enter your new password'
    >
      <ResetPasswordForm token={token} />
    </AuthLayout>
  )
}

export default ResetPassword
