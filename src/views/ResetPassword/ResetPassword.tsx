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
    <AuthLayout title='Reset Password - Podcast Player'>
      <section className={styles.formSection}>
        <h2 className={styles.title}>Reset your password</h2>
        <p className={styles.subtitle}>Enter your new password</p>

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
      </section>
    </AuthLayout>
  )
}

export default ResetPassword
