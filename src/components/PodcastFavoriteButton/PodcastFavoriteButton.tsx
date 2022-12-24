import useMe from '@/hooks/useMe'
import useFavoritePodcast from '@/hooks/useFavoritePodcast'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import styles from './PodcastFavoriteButton.module.scss'

type PodcastFavoriteButtonProps = {
  isFavorite?: boolean
  id: string
}

const PodcastFavoriteButton = ({ isFavorite, id }: PodcastFavoriteButtonProps) => {
  const me = useMe()
  const { addOrRemoveFavorite } = useFavoritePodcast({ isFavorite, id })

  if (!me) return null

  return (
    <button
      onClick={addOrRemoveFavorite}
      aria-label={isFavorite ? 'Remove podcast from favorites' : 'Add podcast to favorites'}
      className={styles.button}
    >
      {isFavorite ? (
        <FavoriteIcon className={styles.icon} />
      ) : (
        <FavoriteBorderIcon className={styles.icon} />
      )}
    </button>
  )
}

export default PodcastFavoriteButton
