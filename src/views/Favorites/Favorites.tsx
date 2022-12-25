import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import PodcastList from '@/components/PodcastList'
import { EmptyBoxIllustrationSvg } from '@/svg'
import styles from './Favorites.module.scss'

const Favorites: NextPage = () => {
  const { podcasts } = useSelector((state: RootState) => state.favorites)

  return (
    <section className={styles.section}>
      <Head>
        <title>Favorites - Podcast Player</title>
      </Head>

      {podcasts.length > 0 ? (
        <PodcastList title='Favorite Podcasts' podcasts={podcasts} />
      ) : (
        <>
          <h2 className={styles.title}>No Favorite Podcasts</h2>
          <div className={styles.svgWrapper}>
            <EmptyBoxIllustrationSvg className={styles.svg} />
          </div>
        </>
      )}
    </section>
  )
}

export default Favorites
