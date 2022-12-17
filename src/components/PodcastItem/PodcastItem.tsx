import Link from 'next/link'
import Image from 'next/image'
import { IPodcast } from '../../api/podcasts'
import EllipsisText from '../EllipsisText'
import Button from '../Button'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import styles from './PodcastItem.module.scss'
import useMe from '../../hooks/useMe'
import useFavoritePodcast from '../../hooks/useFavoritePodcast'

export const PodcastItem = ({ id, thumbnail, title, publisher, isFavorite }: IPodcast) => {
  const me = useMe()

  const { addOrRemoveFavorite } = useFavoritePodcast({ isFavorite, id })

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

          {me && (
            <button
              onClick={addOrRemoveFavorite}
              aria-label='Add podcast to favorites'
              className={styles.iconButton}
            >
              {isFavorite ? (
                <FavoriteIcon className={styles.iconButtonSvg} />
              ) : (
                <FavoriteBorderIcon className={styles.iconButtonSvg} />
              )}
            </button>
          )}
        </section>
      </div>
    </article>
  )
}

export default PodcastItem
