import { Dispatch, SetStateAction, useState } from 'react'
import api, { IPodcastDetails } from '../../api/api'
import EpisodeItem from '../EpisodeItem'
import Button from '../Button'
import Spinner from '../Spinner'
import styles from './EpisodeList.module.scss'

type EpisodeListProps = {
  podcast: IPodcastDetails
  setPodcast: Dispatch<SetStateAction<IPodcastDetails | undefined>>
}
export const EpisodeList = ({ podcast, setPodcast }: EpisodeListProps) => {
  const [loading, setLoading] = useState(false)
  const { episodes, id, next_episode_pub_date, total_episodes } = podcast

  const fetchEpisodes = async () => {
    setLoading(true)
    const { data } = await api.fetchEpisodes(id, next_episode_pub_date)

    setPodcast(prev => ({
      ...data,
      episodes: [...(prev?.episodes || []), ...data.episodes],
    }))

    setLoading(false)
  }

  const areMoreEpisodes = episodes.length < total_episodes

  return (
    <div>
      <div data-testid='episodes' className={styles.List}>
        {episodes.map(episode => (
          <EpisodeItem key={episode.id} podcastId={id} episode={episode} />
        ))}
      </div>

      {loading && <Spinner />}
      {!loading && areMoreEpisodes && <Button onClick={fetchEpisodes}>Load More</Button>}
    </div>
  )
}

export default EpisodeList
