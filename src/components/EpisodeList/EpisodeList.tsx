import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import { fetchEpisodes } from '../../store/podcast/podcastSlice'
import EpisodeItem from '../EpisodeItem'
import Button from '../Button'
import Spinner from '../Spinner'
import styles from './EpisodeList.module.scss'

export const EpisodeList = () => {
  const dispatch = useDispatch()
  const { areEpisodesFetching, podcast } = useSelector((state: RootState) => state.podcast)

  if (!podcast) return null
  const { episodes, id, next_episode_pub_date, total_episodes } = podcast
  const areMoreEpisodes = episodes.length < total_episodes

  return (
    <div>
      <div data-testid='episodes' className={styles.List}>
        {episodes.map(episode => (
          <EpisodeItem key={episode.id} podcastId={id} episode={episode} />
        ))}
      </div>

      {areEpisodesFetching && <Spinner />}
      {!areEpisodesFetching && areMoreEpisodes && (
        <Button
          variant='outlined'
          color='primary'
          onClick={() => fetchEpisodes(dispatch, id, next_episode_pub_date)}
          className={styles.button}
        >
          Load More
        </Button>
      )}
    </div>
  )
}

export default EpisodeList
