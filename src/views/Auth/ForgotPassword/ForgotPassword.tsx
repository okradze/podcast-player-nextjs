import { NextPage } from 'next'
import { FORM_ERROR } from 'final-form'
import { Field, Form } from 'react-final-form'
import { clientApi } from '@/api'
import { validateEmail } from '@/utils/validators'
import AuthLayout from '@/components/AuthLayout'
import Button from '@/components/Button'
import { EmailInput } from '@/components/Input'
import styles from './ForgotPassword.module.scss'

interface ForgotPasswordFields {
  email: string
}

const ForgotPassword: NextPage = () => {
  const onSubmit = async (values: ForgotPasswordFields) => {
    const { error } = await clientApi.auth.forgotPassword(values)
    if (error) return { [FORM_ERROR]: error.message }
  }

  return (
    <AuthLayout
      pageTitle='Forgot Password - Podcast Player'
      title='Forgot password?'
      subtitle='Enter your email to recover account'
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting, submitSucceeded, hasValidationErrors, submitError }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field name='email' component={EmailInput} validate={validateEmail} />

            {submitError && <p className={styles.error}>{submitError}</p>}
            {submitSucceeded && (
              <p className={styles.success}>
                Reset link will be sent if user with this email exists
              </p>
            )}

            <Button
              className={styles.button}
              disabled={submitting || submitSucceeded || hasValidationErrors}
              type='submit'
            >
              Send me a recovery link
            </Button>
          </form>
        )}
      </Form>
    </AuthLayout>
  )
}

export default ForgotPassword
