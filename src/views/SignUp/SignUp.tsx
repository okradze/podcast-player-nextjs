import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { FormApi, FORM_ERROR } from 'final-form'
import * as authApi from '../../api/auth'
import { setMe } from '../../store/auth/authSlice'
import Input from '../../components/Input'
import AuthLayout from '../../components/AuthLayout'
import Button from '../../components/Button'
import useAuthReset from '../../hooks/useAuthReset'
import { validateFullName, validateEmail, validatePassword } from '../../utils/validators'
import styles from './SignUp.module.scss'

interface SignUpFields {
  fullName: string
  email: string
  password: string
}

const SignUp: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const resetAuth = useAuthReset()

  const onSubmit = async (values: SignUpFields, form: FormApi<SignUpFields, SignUpFields>) => {
    try {
      const { data } = await authApi.signup(values)
      resetAuth()
      dispatch(setMe(data))
      router.push('/')
    } catch (error) {
      form.restart()
      return { [FORM_ERROR]: 'Failed to sign up' }
    }
  }

  return (
    <AuthLayout title='Sign Up - Podcast Player'>
      <section className={styles.formSection}>
        <h2 className={styles.title}>Sign Up</h2>
        <p className={styles.subtitle}>Sign up to save favorite podcasts</p>

        <Form initialValues={{ fullName: '', email: '', password: '' }} onSubmit={onSubmit}>
          {({ handleSubmit, submitting, submitError }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field name='fullName' validate={validateFullName}>
                {({ input, meta }) => (
                  <Input
                    label='Full Name'
                    placeholder='John Doe'
                    error={meta.touched && meta.error}
                    {...input}
                  />
                )}
              </Field>

              <Field name='email' validate={validateEmail}>
                {({ input, meta }) => (
                  <Input
                    label='Email'
                    placeholder='mail@website.com'
                    error={meta.touched && meta.error}
                    {...input}
                  />
                )}
              </Field>

              <Field name='password' validate={validatePassword}>
                {({ input, meta }) => (
                  <Input
                    label='Password'
                    type='password'
                    error={meta.touched && meta.error}
                    {...input}
                  />
                )}
              </Field>

              {submitError && <p className={styles.error}>{submitError}</p>}

              <Button className={styles.button} disabled={submitting} type='submit'>
                Sign Up
              </Button>
            </form>
          )}
        </Form>

        <p className={styles.memberText}>
          Already a member?{' '}
          <Link passHref href='/auth/signin'>
            <Button element='link' variant='text'>
              Sign In
            </Button>
          </Link>
        </p>
      </section>
    </AuthLayout>
  )
}

export default SignUp
