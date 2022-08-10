import React from 'react'
import { IPodcast } from '../../api/listenNotesApi'
import PodcastItem from '../PodcastItem'
import styles from './PodcastList.module.scss'

type PodcastListProps = {
  podcasts: IPodcast[]
  title?: string
}

export const PodcastList = ({ podcasts, title }: PodcastListProps) => (
  <div className={styles.Wrapper}>
    <h2 className={`${styles.Title} ${title && styles.SmallTitle}`}>
      {title || 'Popular Podcasts'}
    </h2>
    <div className={styles.PodcastList}>
      {podcasts.map((podcast) => (
        <PodcastItem key={podcast.id} {...podcast} />
      ))}
    </div>
  </div>
)

export default React.memo(PodcastList)
