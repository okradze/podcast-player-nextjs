import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import PodcastList from '../../components/PodcastList/PodcastList'
import EpisodeList from '../../components/EpisodeList/EpisodeList'
import listenNotesApi, { IPodcast, IPodcastDetails } from '../../api/listenNotesApi'
import styles from './Podcastpage.module.scss'

type PodcastProps = {
  initialPodcast?: IPodcastDetails
  recommendations?: IPodcast[]
}

const Podcast: NextPage<PodcastProps> = ({ initialPodcast, recommendations }) => {
  const [podcast, setPodcast] = useState(initialPodcast)

  if (!podcast || !recommendations) {
    return <h1>Error</h1>
  }

  const { thumbnail, publisher, description, title } = podcast

  return (
    <div>
      <Head>
        <title>{`${podcast.title} - Podcast Player`}</title>
      </Head>

      <div>
        <h2 className={styles.Title}>{title}</h2>
        <div className={styles.Content}>
          <div className={styles.ThumbnailWrapper}>
            <Image
              width={200}
              height={200}
              className={styles.Thumbnail}
              src={thumbnail}
              alt=''
            />
          </div>
          <div>
            <h3 className={styles.Publisher}>{publisher}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              className={styles.Text}
            />
          </div>
        </div>

        <div className={styles.EpisodeList}>
          <EpisodeList podcast={podcast} setPodcast={setPodcast} />
        </div>

        <PodcastList podcasts={recommendations} title='Recommendations' />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PodcastProps> = async ({
  params,
}) => {
  const podcastId = params?.podcastId
  if (!podcastId || typeof podcastId !== 'string') return { props: {} }

  const [podcast, recommendations] = await Promise.all([
    listenNotesApi.fetchPodcast(podcastId),
    listenNotesApi.fetchRecommendations(podcastId),
  ])

  return {
    props: {
      initialPodcast: podcast.data,
      recommendations: recommendations.data.recommendations,
    },
  }
}

export default Podcast
