import type { NextPage } from 'next'
import Head from 'next/head'
import PodcastList from '../components/PodcastList'
import PODCASTS_FIXTURE, { PODCASTS_DATA } from '../fixtures/podcasts'
import styles from '../styles/Home.module.css'

type HomeProps = {
  initialPodcasts: any[]
}

const Home: NextPage<HomeProps> = (props) => {
  const podcasts = props.initialPodcasts

  console.log(podcasts)
  return (
    <div>
      <Head>
        <title>Home - Podcast Player</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {podcasts.length > 0 && <PodcastList podcasts={podcasts} />}
    </div>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {
      initialPodcasts: PODCASTS_DATA.podcasts,
    },
  }
}

export default Home
