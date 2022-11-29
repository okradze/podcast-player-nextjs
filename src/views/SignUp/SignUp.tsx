import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as authApi from '../../api/auth'
import { setMe } from '../../store/auth/authSlice'
import Input from '../../components/Input'
import styles from './SignUp.module.scss'

type SignUpProps = {}

const SignUp: NextPage<SignUpProps> = () => {
  const dispatch = useDispatch()

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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <Head>
        <title>Sign Up - Podcast Player</title>
      </Head>

      <h2>Sign Up</h2>
      <p>
        Already a member?{' '}
        <Link href='/auth/signin'>
          <a>Sign in</a>
        </Link>
      </p>

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

        <button type='submit'>Sign Up</button>
      </form>
    </section>
  )
}

export default SignUp
