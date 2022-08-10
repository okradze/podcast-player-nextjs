import EpisodeItem from '../EpisodeItem/EpisodeItem'
import Button from '../Button'
import Spinner from '../Spinner/Spinner'
import styles from './EpisodeList.module.scss'
import listenNotesApi, { IPodcastDetails } from '../../api/listenNotesApi'
import { Dispatch, SetStateAction, useState } from 'react'

type EpisodeListProps = {
  podcast: IPodcastDetails
  setPodcast: Dispatch<SetStateAction<IPodcastDetails | undefined>>
}

export const EpisodeList = ({ podcast, setPodcast }: EpisodeListProps) => {
  const [loading, setLoading] = useState(false)
  const { episodes, id, next_episode_pub_date } = podcast
  const areMoreEpisodes = !!next_episode_pub_date

  const fetchEpisodes = async () => {
    setLoading(true)
    const { data } = await listenNotesApi.fetchEpisodes(id, next_episode_pub_date)

    setPodcast((prev) => ({
      ...data,
      episodes: [...(prev?.episodes || []), ...data.episodes],
    }))
    setLoading(false)
  }

  return (
    <div>
      <div data-testid='episodes' className={styles.List}>
        {episodes.map((episode: any) => (
          <EpisodeItem key={episode.id} episode={episode} />
        ))}
      </div>

      {loading && <Spinner />}
      {!loading && areMoreEpisodes && <Button onClick={fetchEpisodes}>Load More</Button>}
    </div>
  )
}

export default EpisodeList
