import { NextPage } from 'next'
import { FORM_ERROR } from 'final-form'
import { useRouter } from 'next/router'
import { Field, Form } from 'react-final-form'
import { clientApi } from '@/api'
import { composeValidators, validatePassword } from '@/utils/validators'
import AuthLayout from '@/components/AuthLayout'
import Button from '@/components/Button'
import { PasswordInput } from '@/components/Input'
import styles from './ResetPassword.module.scss'

export type ResetPasswordProps = {
  isTokenExpired?: boolean
  fullName?: string
}

interface ResetPasswordFields {
  password: string
}

const ResetPassword: NextPage = ({ isTokenExpired, fullName }: ResetPasswordProps) => {
  const router = useRouter()
  const { token } = router.query

  if (!token || typeof token !== 'string' || isTokenExpired)
    return <h2 className={styles.expiredHeading}>Reset link is expired</h2>

  const onSubmit = async (values: ResetPasswordFields) => {
    const { error } = await clientApi.auth.resetPassword(token, values)
    if (error) return { [FORM_ERROR]: error.message }
  }

  return (
    <AuthLayout
      pageTitle='Reset Password - Podcast Player'
      title={`Hello ${fullName || ''}`}
      subtitle='Enter your new password'
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting, submitError, hasValidationErrors, submitSucceeded }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field name='password' component={PasswordInput} validate={validatePassword} />

            <Field
              name='repeatPassword'
              label='Repeat Password'
              component={PasswordInput}
              validate={composeValidators(validatePassword, (value, allValues: any) => {
                if (value !== allValues.password) return 'Passwords must match'
              })}
            />

            {submitError && <p className={styles.error}>{submitError}</p>}
            {submitSucceeded && (
              <p className={styles.success}>New password is set. You can sign in now.</p>
            )}

            <Button
              className={styles.button}
              disabled={submitting || submitSucceeded || hasValidationErrors}
              type='submit'
            >
              Set new password
            </Button>
          </form>
        )}
      </Form>
    </AuthLayout>
  )
}

export default ResetPassword
