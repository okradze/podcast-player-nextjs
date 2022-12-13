import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as authApi from '../../api/auth'
import { setMe } from '../../store/auth/authSlice'
import Input from '../../components/Input'
import Button from '../../components/Button'
import styles from './SignIn.module.scss'
import PodcastIllustrationSvg from '../../svg/PodcastIllustrationSvg'

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
    <section className={styles.section}>
      <Head>
        <title>Sign In - Podcast Player</title>
      </Head>

      <PodcastIllustrationSvg className={styles.illustration} />

      <section className={styles.formSection}>
        <h2 className={styles.title}>Sign In</h2>
        <p className={styles.subtitle}>See your favorite podcasts</p>

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

          <p className={styles.forgetPassword}>
            <Button variant='text'>Forget password?</Button>
          </p>

          <Button className={styles.button} type='submit'>
            Sign In
          </Button>
        </form>

        <p className={styles.registerText}>
          Not registered yet?{' '}
          <Link passHref href='/auth/signup'>
            <Button element='link' variant='text'>
              Create an account
            </Button>
          </Link>
        </p>
      </section>
    </section>
  )
}

export default SignIn
