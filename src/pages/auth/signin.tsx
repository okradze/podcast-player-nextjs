import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useRef } from 'react'
import Input from '../../components/Input'
import styles from '../../styles/SignUp.module.scss'

type SignUpProps = {}

const SignUp: NextPage<SignUpProps> = () => {
  const values = useRef({
    fullName: '',
    email: '',
    password: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(values)
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
          placeholder=''
          onChange={e => (values.current.password = e.target.value)}
        />

        <p>
          <a href=''>Forget password?</a>
        </p>

        <button type='submit'>Sign Up</button>
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

export default SignUp
