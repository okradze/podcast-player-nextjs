import Link from 'next/link'
import Image from 'next/image'
import { IPodcast } from '../../api/api'
import EllipsisText from '../EllipsisText'
import Button from '../Button'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styles from './PodcastItem.module.scss'

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

      <section className={styles.buttons}>
        <Link passHref href={`/podcast/${id}`}>
          <Button element='link' variant='outlined' className={styles.button}>
            View More
          </Button>
        </Link>

        <button aria-label='Add podcast to favorites' className={styles.iconButton}>
          <FavoriteBorderIcon className={styles.iconButtonSvg} />
        </button>
      </section>

      {/* <FavoriteIcon /> */}
    </div>
  </article>
)

export default PodcastItem
