import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { FormApi, FORM_ERROR } from 'final-form'
import * as authApi from '../../api/auth'
import { setMe } from '../../store/auth/authSlice'
import Input from '../../components/Input'
import Button from '../../components/Button'
import AuthLayout from '../../components/AuthLayout'
import useAuthReset from '../../hooks/useAuthReset'
import styles from './SignIn.module.scss'

interface SignInFields {
  email: string
  password: string
}

const validateEmail = (email: string | undefined) => {
  if (!email) return
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!regex.test(email)) return 'Email is not valid'
}

const validatePassword = (value: string | undefined) => {
  if (value === '') return 'Password is required'
}

const SignIn: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const resetAuth = useAuthReset()

  const onSubmit = async (values: SignInFields, form: FormApi<SignInFields, SignInFields>) => {
    try {
      const { data } = await authApi.signin(values)
      resetAuth()
      dispatch(setMe(data))
      router.push('/')
    } catch (error) {
      form.reset()
      return { [FORM_ERROR]: 'Email or password is incorrect' }
    }
  }

  return (
    <AuthLayout title='Sign In - Podcast Player'>
      <section className={styles.formSection}>
        <h2 className={styles.title}>Sign In</h2>
        <p className={styles.subtitle}>Sign in to see your favorite podcasts</p>

        <Form onSubmit={onSubmit}>
          {({ handleSubmit, submitting, submitError }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field name='email' validate={validateEmail}>
                {({ input, meta }) => (
                  <Input
                    label='Email'
                    placeholder='mail@website.com'
                    error={meta.error && meta.touched && meta.error}
                    {...input}
                  />
                )}
              </Field>

              <Field name='password' validate={validatePassword}>
                {({ input, meta }) => (
                  <Input
                    label='Password'
                    type='password'
                    error={meta.error && meta.touched && meta.error}
                    {...input}
                  />
                )}
              </Field>

              <p className={styles.forgetPassword}>
                <Button variant='text'>Forget password?</Button>
              </p>

              {submitError && <p className={styles.error}>{submitError}</p>}

              <Button className={styles.button} disabled={submitting} type='submit'>
                Sign In
              </Button>
            </form>
          )}
        </Form>

        <p className={styles.registerText}>
          Not registered yet?{' '}
          <Link passHref href='/auth/signup'>
            <Button element='link' variant='text'>
              Create an account
            </Button>
          </Link>
        </p>
      </section>
    </AuthLayout>
  )
}

export default SignIn
