import { FORM_ERROR } from 'final-form'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'

import { clientApi } from '@/api'
import AuthLayout from '@/components/AuthLayout'
import Button from '@/components/Button'
import { EmailInput, PasswordInput } from '@/components/Input'
import useAuthReset from '@/hooks/useAuthReset'
import { setMe } from '@/store/auth/authSlice'
import { validateEmail, validatePasswordRequired } from '@/utils/validators'

import styles from './SignIn.module.scss'

interface SignInFields {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const resetAuth = useAuthReset()

  const onSubmit = async (values: SignInFields) => {
    const { data, error } = await clientApi.auth.signIn(values)
    if (error) return { [FORM_ERROR]: error.message }

    resetAuth()
    dispatch(setMe(data))
    router.push('/')
  }

  return (
    <AuthLayout pageTitle='Sign In - Podcast Player' title='Sign In' subtitle='Sign in to see your favorite podcasts'>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting, hasValidationErrors, submitError }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field name='email' component={EmailInput} validate={validateEmail} />

            <Field name='password' component={PasswordInput} validate={validatePasswordRequired} />

            <p className={styles.forgetPassword}>
              <Link passHref href='/auth/forgot-password'>
                <Button element='link' variant='text'>
                  Forget password?
                </Button>
              </Link>
            </p>

            {submitError && <p className={styles.error}>{submitError}</p>}

            <Button className={styles.button} disabled={submitting || hasValidationErrors} type='submit'>
              Sign In
            </Button>
          </form>
        )}
      </Form>

      <p className={styles.registerText}>
        Not registered yet?{' '}
        <Link passHref href='/auth/sign-up'>
          <Button element='link' variant='text'>
            Create an account
          </Button>
        </Link>
      </p>
    </AuthLayout>
  )
}

export default SignIn
