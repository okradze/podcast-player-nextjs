import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import PodcastList from '../components/PodcastList'
import PODCASTS_FIXTURE, { PODCASTS_DATA, PODCAST_LISTS } from '../fixtures/podcasts'

type DiscoverProps = {
  initialLists: any[]
}

const Discover: NextPage<DiscoverProps> = (props) => {
  const lists = props.initialLists

  return (
    <div>
      <Head>
        <title>Discover - Podcast Player</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {lists.length > 0 &&
        lists.map(({ id, title, podcasts }) => (
          <PodcastList key={id} title={title} podcasts={podcasts} />
        ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<DiscoverProps> = async () => {
  console.log('discover getServerSideProps')

  return {
    props: {
      initialLists: PODCAST_LISTS.curated_lists,
    },
  }
}

export default Discover
