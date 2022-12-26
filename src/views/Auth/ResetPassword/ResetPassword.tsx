import { NextPage } from 'next'
import { FORM_ERROR } from 'final-form'
import { useRouter } from 'next/router'
import { Field, Form } from 'react-final-form'
import { clientApi } from '@/api'
import { validatePassword } from '@/utils/validators'
import AuthLayout from '@/components/AuthLayout'
import Button from '@/components/Button'
import Input from '@/components/Input'
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
    if (error) return { [FORM_ERROR]: 'Something went wrong' }
  }

  return (
    <AuthLayout
      pageTitle='Reset Password - Podcast Player'
      title={`Hello ${fullName || ''}`}
      subtitle='Enter your new password'
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting, submitError, submitSucceeded }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field name='password' validate={validatePassword}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  label='Password'
                  type='password'
                  error={meta.touched && meta.error}
                />
              )}
            </Field>

            <Field
              name='repeatPassword'
              validate={(value, allValues: any) => {
                if (value !== allValues.password) return 'Passwords must match'
              }}
            >
              {({ input, meta }) => (
                <Input
                  {...input}
                  label='Repeat Password'
                  type='password'
                  error={meta.touched && meta.error}
                />
              )}
            </Field>

            {submitError && <p className={styles.error}>{submitError}</p>}
            {submitSucceeded && (
              <p className={styles.success}>New password is set. You can sign in now.</p>
            )}

            <Button
              className={styles.button}
              disabled={submitting || submitSucceeded}
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
