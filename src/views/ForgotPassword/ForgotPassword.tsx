import { NextPage } from 'next'
import { Field, Form } from 'react-final-form'
import AuthLayout from '../../components/AuthLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { validateEmail } from '../../utils/validators'
import styles from './ForgotPassword.module.scss'

const ForgotPassword: NextPage = () => {
  const onSubmit = (values: any) => {}

  return (
    <AuthLayout
      pageTitle='Forgot Password - Podcast Player'
      title='Forgot password?'
      subtitle='Enter your email to recover account'
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting, submitError }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field name='email' validate={validateEmail}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  label='Email'
                  placeholder='mail@website.com'
                  error={meta.touched && meta.error}
                />
              )}
            </Field>

            {submitError && <p className={styles.error}>{submitError}</p>}

            <Button className={styles.button} disabled={submitting} type='submit'>
              Send me a recovery link
            </Button>
          </form>
        )}
      </Form>
    </AuthLayout>
  )
}

export default ForgotPassword
