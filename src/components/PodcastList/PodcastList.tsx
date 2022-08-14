import React from 'react'
import { IPodcast } from '../../api/listenNotesApi'
import PodcastItem from '../PodcastItem'
import styles from './PodcastList.module.scss'

type PodcastListProps = {
  podcasts: IPodcast[]
  title?: string
}

export const PodcastList = ({ podcasts, title }: PodcastListProps) => (
  <section className={styles.Wrapper}>
    <h2 className={`${styles.Title} ${title && styles.SmallTitle}`}>
      {title || 'Popular Podcasts'}
    </h2>
    <ul className={styles.List}>
      {podcasts.map(podcast => (
        <li className={styles.Item} key={podcast.id}>
          <PodcastItem {...podcast} />
        </li>
      ))}
    </ul>
  </section>
)

export default React.memo(PodcastList)
