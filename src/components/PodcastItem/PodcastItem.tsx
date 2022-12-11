import Link from 'next/link'
import Image from 'next/image'
import { IPodcast } from '../../api/api'
import EllipsisText from '../EllipsisText'
import styles from './PodcastItem.module.scss'
import Button from '../Button'

type PodcastItemProps = IPodcast

export const PodcastItem = ({ id, thumbnail, title, publisher }: PodcastItemProps) => (
  <article className={styles.Item}>
    <div className={styles.ImageWrapper}>
      <Image width={150} height={150} className={styles.Image} src={thumbnail} alt={title} />
    </div>
    <div className={styles.Content}>
      <EllipsisText tagName='p' className={styles.Publisher}>
        {publisher}
      </EllipsisText>
      <EllipsisText tagName='h4' className={styles.Title}>
        {title}
      </EllipsisText>

      <Link passHref href={`/podcast/${id}`}>
        <Button element='link' variant='outlined' className={styles.button}>
          View More
        </Button>
      </Link>
    </div>
  </article>
)

export default PodcastItem
