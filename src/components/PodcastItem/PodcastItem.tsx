import React from 'react'
import Link from 'next/link'
import EllipsisText from '../EllipsisText'
import styles from './PodcastItem.module.scss'

type PodcastItemProps = {
  id: string
  thumbnail: string
  title: string
  publisher: string
}

export const PodcastItem = ({ id, thumbnail, title, publisher }: PodcastItemProps) => (
  <div className={styles.Item} key={id}>
    <div className={styles.ImageWrapper}>
      <img className={styles.Image} src={thumbnail} alt='' />
    </div>
    <div className={styles.Content}>
      <EllipsisText tagName='p' className={styles.Publisher}>
        {publisher}
      </EllipsisText>
      <EllipsisText tagName='h4' className={styles.Title}>
        {title}
      </EllipsisText>

      <Link href={`/podcast/${id}`} className={styles.Button}>
        View More
      </Link>
    </div>
  </div>
)

export default PodcastItem
