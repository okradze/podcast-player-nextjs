import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import PodcastList from '@/components/PodcastList'

const Favorites: NextPage = () => {
  const { podcasts } = useSelector((state: RootState) => state.favorites)

  return (
    <div>
      <Head>
        <title>Favorites - Podcast Player</title>
      </Head>

      <PodcastList title='Favorite Podcasts' podcasts={podcasts} />
    </div>
  )
}

export default Favorites
