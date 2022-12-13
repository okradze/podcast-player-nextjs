import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as authApi from '../../api/auth'
import { setMe } from '../../store/auth/authSlice'
import Input from '../../components/Input'
import styles from './SignUp.module.scss'
import AuthLayout from '../../components/AuthLayout'
import Button from '../../components/Button'

type SignUpProps = {}

const SignUp: NextPage<SignUpProps> = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const values = useRef({
    fullName: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data } = await authApi.signup(values.current)
      dispatch(setMe(data))
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthLayout title='Sign Up - Podcast Player'>
      <section className={styles.formSection}>
        <h2 className={styles.title}>Sign Up</h2>
        <p className={styles.subtitle}>Sign up to save favorite podcasts</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label='Full Name'
            name='fullName'
            placeholder='John Doe'
            onChange={e => (values.current.fullName = e.target.value)}
          />

          <Input
            label='Email'
            name='email'
            placeholder='mail@website.com'
            onChange={e => (values.current.email = e.target.value)}
          />

          <Input
            label='Password'
            name='password'
            type='password'
            placeholder='Min 8 characters'
            onChange={e => (values.current.password = e.target.value)}
          />

          <Button className={styles.button} type='submit'>
            Sign Up
          </Button>
        </form>

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
