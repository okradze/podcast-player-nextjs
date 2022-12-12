import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as authApi from '../../api/auth'
import { setMe } from '../../store/auth/authSlice'
import Input from '../../components/Input'
import styles from './SignIn.module.scss'

type SignInProps = {}

const SignIn: NextPage<SignInProps> = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const values = useRef({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data } = await authApi.signin(values.current)
      dispatch(setMe(data))
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <Head>
        <title>Sign In - Podcast Player</title>
      </Head>

      <h2>Sign In</h2>
      <p>Sign in to See your favorite podcasts</p>

      <form className={styles.form} onSubmit={handleSubmit}>
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
          onChange={e => (values.current.password = e.target.value)}
        />

        <p>
          <a href=''>Forget password?</a>
        </p>

        <button type='submit'>Sign In</button>
      </form>

      <p>
        Not registered yet?{' '}
        <Link href='/auth/signup'>
          <a>Create an account</a>
        </Link>
      </p>
    </section>
  )
}

export default SignIn
