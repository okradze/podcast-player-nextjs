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
import { validateEmail, validatePasswordRequired } from '../../utils/validators'
import styles from './SignIn.module.scss'

interface SignInFields {
  email: string
  password: string
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
      form.restart()
      return { [FORM_ERROR]: 'Email or password is incorrect' }
    }
  }

  return (
    <AuthLayout
      pageTitle='Sign In - Podcast Player'
      title='Sign In'
      subtitle='Sign in to see your favorite podcasts'
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

            <Field name='password' validate={validatePasswordRequired}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  label='Password'
                  type='password'
                  error={meta.touched && meta.error}
                />
              )}
            </Field>

            <p className={styles.forgetPassword}>
              <Link passHref href='/auth/forgot-password'>
                <Button element='link' variant='text'>
                  Forget password?
                </Button>
              </Link>
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
    </AuthLayout>
  )
}

export default SignIn
