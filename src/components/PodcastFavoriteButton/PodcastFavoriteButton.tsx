import { SwitchTransition, CSSTransition } from 'react-transition-group'
import useMe from '@/hooks/useMe'
import useFavoritePodcast from '@/hooks/useFavoritePodcast'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import styles from './PodcastFavoriteButton.module.scss'
import { useRef } from 'react'

type PodcastFavoriteButtonProps = {
  isFavorite?: boolean
  id: string
}

const PodcastFavoriteButton = ({ isFavorite, id }: PodcastFavoriteButtonProps) => {
  const me = useMe()
  const { addOrRemoveFavorite } = useFavoritePodcast({ isFavorite, id })

  const favoriteRef = useRef(null)
  const notFavoriteRef = useRef(null)
  const nodeRef = isFavorite ? favoriteRef : notFavoriteRef

  if (!me) return null

  return (
    <button
      onClick={addOrRemoveFavorite}
      aria-label={isFavorite ? 'Remove podcast from favorites' : 'Add podcast to favorites'}
      className={styles.button}
    >
      <SwitchTransition>
        <CSSTransition
          key={isFavorite ? 'remove' : 'add'}
          timeout={200}
          unmountOnExit
          nodeRef={nodeRef}
          classNames={{
            enter: styles.ender,
            exit: styles.exit,
            enterActive: styles.enterActive,
            exitActive: styles.exitActive,
          }}
        >
          {isFavorite ? (
            <FavoriteIcon ref={nodeRef} className={styles.icon} />
          ) : (
            <FavoriteBorderIcon ref={nodeRef} className={styles.icon} />
          )}
        </CSSTransition>
      </SwitchTransition>
    </button>
  )
}

export default PodcastFavoriteButton
