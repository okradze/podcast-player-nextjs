import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { clientApi } from '@/api'
import { setMe } from '@/store/auth/authSlice'
import useAuthReset from '@/hooks/useAuthReset'
import { validateFullName, validateEmail, validatePassword } from '@/utils/validators'
import AuthLayout from '@/components/AuthLayout'
import { EmailInput, PasswordInput, FullNameInput } from '@/components/Input'
import Button from '@/components/Button'
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

  const onSubmit = async (values: SignUpFields) => {
    const { data, error } = await clientApi.auth.signUp(values)
    if (error) return { [FORM_ERROR]: error.message }

    resetAuth()
    dispatch(setMe(data))
    router.push('/')
  }

  return (
    <AuthLayout
      pageTitle='Sign Up - Podcast Player'
      title='Sign Up'
      subtitle='Sign up to save favorite podcasts'
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting, hasValidationErrors, submitError }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field name='fullName' component={FullNameInput} validate={validateFullName} />

            <Field name='email' component={EmailInput} validate={validateEmail} />

            <Field name='password' component={PasswordInput} validate={validatePassword} />

            {submitError && <p className={styles.error}>{submitError}</p>}

            <Button
              className={styles.button}
              disabled={submitting || hasValidationErrors}
              type='submit'
            >
              Sign Up
            </Button>
          </form>
        )}
      </Form>

      <p className={styles.memberText}>
        Already a member?{' '}
        <Link passHref href='/auth/sign-in'>
          <Button element='link' variant='text'>
            Sign In
          </Button>
        </Link>
      </p>
    </AuthLayout>
  )
}

export default SignUp
