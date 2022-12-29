import React from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { IEpisode } from '@/api/podcasts'
import { RootState } from '@/store/rootReducer'
import { playEpisode } from '@/store/playingPodcast/playingPodcastSlice'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import EllipsisText from '../EllipsisText'
import styles from './EpisodeItem.module.scss'

type EpisodeItemProps = {
  episode: IEpisode
  podcastId: string
}

export const EpisodeItem = ({ episode, podcastId }: EpisodeItemProps) => {
  const dispatch = useDispatch()
  const playingEpisode = useSelector((state: RootState) => state.playingPodcast.playingEpisode)
  const { thumbnail, audio_length_sec, title } = episode

  const isPlaying = playingEpisode?.id === episode.id

  return (
    <li className={styles.Episode} data-testid='episode'>
      <div className={styles.ImageWrapper}>
        <Image width={40} height={40} src={thumbnail} alt='' />
      </div>
      <div className={styles.Content}>
        <div>
          <EllipsisText tagName='h4' className={styles.Title}>
            {title}
          </EllipsisText>
          <time className={styles.Duration}>
            {new Date(audio_length_sec * 1000).toISOString().substr(11, 8)}
          </time>
        </div>

        <button
          className={styles.button}
          onClick={() => dispatch(playEpisode({ podcastId, episode }))}
        >
          {isPlaying ? (
            <PauseCircleIcon className={styles.svg} />
          ) : (
            <PlayCircleIcon className={styles.svg} />
          )}
        </button>
      </div>
    </li>
  )
}

export default EpisodeItem
