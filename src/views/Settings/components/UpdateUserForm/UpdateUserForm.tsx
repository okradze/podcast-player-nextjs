import { FORM_ERROR } from 'final-form'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { authApi } from '../../../../api'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import useMe from '../../../../hooks/useMe'
import { setMe } from '../../../../store/auth/authSlice'
import { validateFullName } from '../../../../utils/validators'
import styles from './UpdateUserForm.module.scss'

interface UpdateUserFormFields {
  fullName: string
}

const UpdateUserForm = () => {
  const dispatch = useDispatch()
  const me = useMe()
  if (!me) return null

  const onSubmit = async (values: UpdateUserFormFields) => {
    try {
      const { data } = await authApi.updateUser(values)
      dispatch(setMe(data))
    } catch (error) {
      return { [FORM_ERROR]: 'Something went wrong' }
    }
  }

  return (
    <section className={styles.section}>
      <Form initialValues={{ fullName: me.fullName, email: me.email }} onSubmit={onSubmit}>
        {({ handleSubmit, submitting, submitError, submitSucceeded }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field name='fullName' validate={validateFullName}>
              {({ input, meta }) => (
                <Input {...input} label='Full Name' error={meta.touched && meta.error} />
              )}
            </Field>

            <Field name='email'>
              {({ input, meta }) => (
                <Input {...input} label='Email' error={meta.touched && meta.error} disabled />
              )}
            </Field>

            {submitError && <p className={styles.error}>{submitError}</p>}
            {submitSucceeded && <p className={styles.success}>User profile has been updated</p>}

            <Button className={styles.button} disabled={submitting} type='submit'>
              Update Profile
            </Button>
          </form>
        )}
      </Form>
    </section>
  )
}

export default UpdateUserForm
