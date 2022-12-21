import { NextPage } from 'next'
import { Field, Form } from 'react-final-form'
import AuthLayout from '../../components/AuthLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { validatePassword } from '../../utils/validators'
import styles from './ResetPassword.module.scss'

const ResetPassword: NextPage = () => {
  const onSubmit = (values: any) => {}

  return (
    <AuthLayout
      pageTitle='Reset Password - Podcast Player'
      title='Reset your password'
      subtitle='Enter your new password'
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting, submitError, values }) => (
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

            <Button className={styles.button} disabled={submitting} type='submit'>
              Set new password
            </Button>
          </form>
        )}
      </Form>
    </AuthLayout>
  )
}

export default ResetPassword
