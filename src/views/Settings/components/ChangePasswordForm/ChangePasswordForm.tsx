import { FORM_ERROR } from 'final-form'
import { Field, Form } from 'react-final-form'
import { authApi } from '../../../../api'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { validatePassword, validatePasswordRequired } from '../../../../utils/validators'
import styles from './ChangePasswordForm.module.scss'

interface ChangePasswordFormFields {
  currentPassword: string
  password: string
}

const ChangePasswordForm = () => {
  const onSubmit = async (values: ChangePasswordFormFields) => {
    try {
      await authApi.changePassword(values)
    } catch (error) {
      return { [FORM_ERROR]: 'Invalid current password' }
    }
  }

  return (
    <section className={styles.section}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting, submitError, submitSucceeded }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field name='currentPassword' validate={validatePasswordRequired}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  label='Current Password'
                  type='password'
                  error={meta.touched && meta.error}
                />
              )}
            </Field>

            <Field name='password' validate={validatePassword}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  label='New Password'
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
            {submitSucceeded && <p className={styles.success}>Password is changed</p>}

            <Button className={styles.button} disabled={submitting} type='submit'>
              Change password
            </Button>
          </form>
        )}
      </Form>
    </section>
  )
}

export default ChangePasswordForm
