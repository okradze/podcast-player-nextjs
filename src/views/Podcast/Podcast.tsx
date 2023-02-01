import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import EpisodeList from '@/components/EpisodeList'
import PodcastFavoriteButton from '@/components/PodcastFavoriteButton'
import PodcastList from '@/components/PodcastList'
import { RootState } from '@/store/rootReducer'

import styles from './Podcast.module.scss'

const Podcast: NextPage = () => {
  const { podcast, recommendations } = useSelector((state: RootState) => state.podcast)

  if (!podcast || !recommendations) {
    return <h1>Could not load podcast</h1>
  }

  const { thumbnail, publisher, description, title, isFavorite, id } = podcast

  return (
    <div>
      <Head>
        <title>{`${podcast.title} - Podcast Player`}</title>
      </Head>

      <div>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <PodcastFavoriteButton isFavorite={isFavorite} id={id} />
        </header>
        <div className={styles.Content}>
          <div className={styles.ThumbnailWrapper}>
            <Image width={200} height={200} className={styles.Thumbnail} src={thumbnail} alt='' />
          </div>
          <div>
            <h3 className={styles.publisher}>{publisher}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              className={styles.text}
            />
          </div>
        </div>

        <div className={styles.EpisodeList}>
          <EpisodeList />
        </div>

        <PodcastList podcasts={recommendations} title='Recommendations' isSmallerTitle />
      </div>
    </div>
  )
}

export default Podcast
