import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { FormApi, FORM_ERROR } from 'final-form'
import { authApi, clientApi } from '@/api'
import { setMe } from '@/store/auth/authSlice'
import useAuthReset from '@/hooks/useAuthReset'
import { validateFullName, validateEmail, validatePassword } from '@/utils/validators'
import AuthLayout from '@/components/AuthLayout'
import Input from '@/components/Input'
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

  const onSubmit = async (values: SignUpFields, form: FormApi<SignUpFields, SignUpFields>) => {
    const { data, error } = await clientApi.auth.signUp(values)

    if (error) {
      form.restart()
      return { [FORM_ERROR]: error.message }
    }

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
    </AuthLayout>
  )
}

export default SignUp
