import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useRef } from 'react'
import Input from '../components/Input'
import styles from '../styles/SignUp.module.scss'

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

      <h2>Sign Up</h2>
      <p>Already a member? Sign in</p>

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
          placeholder='Min 8 characters'
          onChange={e => (values.current.password = e.target.value)}
        />

        <p>
          <a href=''>Forget password?</a>
        </p>

        <button type='submit'>Sign Up</button>
      </form>
    </section>
  )
}

export default SignUp
