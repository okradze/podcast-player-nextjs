import Link from 'next/link'
import Image from 'next/image'
import { IPodcast } from '../../api/podcasts'
import EllipsisText from '../EllipsisText'
import Button from '../Button'
import PodcastFavoriteButton from '../PodcastFavoriteButton'
import styles from './PodcastItem.module.scss'

export const PodcastItem = ({ id, thumbnail, title, publisher, isFavorite }: IPodcast) => {
  return (
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

        <section className={styles.buttons}>
          <Link passHref href={`/podcast/${id}`}>
            <Button element='link' variant='outlined' className={styles.button}>
              View More
            </Button>
          </Link>

          <PodcastFavoriteButton isFavorite={isFavorite} id={id} />
        </section>
      </div>
    </article>
  )
}

export default PodcastItem
