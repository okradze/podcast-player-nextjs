import Link from 'next/link'
import Image from 'next/image'
import { IPodcast } from '../../api/listenNotesApi'
import EllipsisText from '../EllipsisText'
import styles from './PodcastItem.module.scss'

type PodcastItemProps = IPodcast

export const PodcastItem = ({ id, thumbnail, title, publisher }: PodcastItemProps) => (
  <div className={styles.Item} key={id}>
    <div className={styles.ImageWrapper}>
      <Image width={150} height={150} className={styles.Image} src={thumbnail} alt='' />
    </div>
    <div className={styles.Content}>
      <EllipsisText tagName='p' className={styles.Publisher}>
        {publisher}
      </EllipsisText>
      <EllipsisText tagName='h4' className={styles.Title}>
        {title}
      </EllipsisText>

      <Link href={`/podcast/${id}`}>
        <a className={styles.Button}>View More</a>
      </Link>
    </div>
  </div>
)

export default PodcastItem
