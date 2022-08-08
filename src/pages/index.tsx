import type { NextPage } from 'next'
import Head from 'next/head'
import PODCASTS_FIXTURE, { PODCASTS_DATA } from '../fixtures/podcasts'
import styles from '../styles/Home.module.css'

const Home: NextPage = (props) => {
  console.log(props)
  return (
    <div>
      <Head>
        <title>Home - Podcast Player</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {
      initialPodcasts: PODCASTS_DATA,
    },
  }
}

export default Home
