import { FORM_ERROR } from 'final-form'
import { Field, Form } from 'react-final-form'

import { clientApi } from '@/api'
import Button from '@/components/Button'
import { PasswordInput } from '@/components/Input'
import { composeValidators, validatePassword } from '@/utils/validators'

import styles from './ResetPasswordForm.module.scss'

interface ResetPasswordFields {
  password: string
}

type ResetPasswordFormProps = {
  token: string
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const onSubmit = async (values: ResetPasswordFields) => {
    const { error } = await clientApi.auth.resetPassword(token, values)
    if (error) return { [FORM_ERROR]: error.message }
  }

  return (
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
          {submitSucceeded && <p className={styles.success}>New password is set. You can sign in now.</p>}

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
  )
}

export default ResetPasswordForm
