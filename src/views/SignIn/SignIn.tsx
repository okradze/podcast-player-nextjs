import { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useRef } from 'react'
import { client, ITokensResponse } from '../../api/api'
import Input from '../../components/Input'
import styles from './SignIn.module.scss'

type SignInProps = {}

const SignIn: NextPage<SignInProps> = () => {
  const values = useRef({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const { data } = await client.post<any, AxiosResponse<ITokensResponse>>(
        '/auth/signin',
        values.current,
      )

      // const res = await client.get<any, AxiosResponse<any>>('/auth/me', {
      //   headers: {
      //     Authorization: `Bearer ${data.accessToken}`,
      //   },
      // })
      console.log(data)
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
