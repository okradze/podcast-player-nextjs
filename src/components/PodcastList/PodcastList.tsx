import React from 'react'
import { IPodcast } from '@/api/podcasts'
import PodcastItem from './PodcastItem'
import styles from './PodcastList.module.scss'

type PodcastListProps = {
  podcasts: IPodcast[]
  title?: string
  isSmallerTitle?: boolean
}

export const PodcastList = ({ podcasts, title, isSmallerTitle }: PodcastListProps) => (
  <section className={styles.Wrapper}>
    <h2 className={`${styles.Title} ${isSmallerTitle ? styles.SmallTitle : ''}`}>{title}</h2>
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
