import Link from 'next/link'
import Image from 'next/image'
import { IPodcast } from '@/api/podcasts'
import EllipsisText from '@/components/EllipsisText'
import Button from '@/components/Button'
import PodcastFavoriteButton from '@/components/PodcastFavoriteButton'
import styles from './PodcastItem.module.scss'

export const PodcastItem = ({ id, thumbnail, title, publisher, isFavorite }: IPodcast) => (
  <li>
    <article className={styles.item}>
      <div className={styles.imageWrapper}>
        <Image width={150} height={150} className={styles.image} src={thumbnail} alt={title} />
      </div>
      <div className={styles.content}>
        <EllipsisText tagName='p' className={styles.publisher}>
          {publisher}
        </EllipsisText>
        <EllipsisText tagName='h3' className={styles.title}>
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
  </li>
)

export default PodcastItem
