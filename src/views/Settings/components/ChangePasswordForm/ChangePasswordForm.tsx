import { FORM_ERROR } from 'final-form'
import { Field, Form } from 'react-final-form'
import { clientApi } from '@/api'
import { composeValidators, validatePassword, validatePasswordRequired } from '@/utils/validators'
import Button from '@/components/Button'
import { PasswordInput } from '@/components/Input'
import styles from './ChangePasswordForm.module.scss'

interface ChangePasswordFormFields {
  currentPassword: string
  password: string
}

const ChangePasswordForm = () => {
  const onSubmit = async (values: ChangePasswordFormFields) => {
    const { error } = await clientApi.auth.changePassword(values)
    if (error) return { [FORM_ERROR]: error.message }
  }

  return (
    <section className={styles.section}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting, hasValidationErrors, submitError, submitSucceeded }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field
              name='currentPassword'
              label='Current Password'
              component={PasswordInput}
              validate={validatePasswordRequired}
            />

            <Field name='password' label='New Password' component={PasswordInput} validate={validatePassword} />

            <Field
              name='repeatPassword'
              label='Repeat Password'
              component={PasswordInput}
              validate={composeValidators(validatePassword, (value, allValues: any) => {
                if (value !== allValues.password) return 'Passwords must match'
              })}
            />

            {submitError && <p className={styles.error}>{submitError}</p>}
            {submitSucceeded && <p className={styles.success}>Password is changed</p>}

            <Button className={styles.button} disabled={submitting || hasValidationErrors} type='submit'>
              Change password
            </Button>
          </form>
        )}
      </Form>
    </section>
  )
}

export default ChangePasswordForm
