import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { IEpisode } from '../../api/listenNotesApi'
// import { playEpisode } from '../../store/playingPodcast/playingPodcastSlice'
import EllipsisText from '../EllipsisText'
import PlaySvg from '../../svg/PlaySvg'
import styles from './EpisodeItem.module.scss'

type EpisodeItemProps = {
  episode: IEpisode
}

const playEpisode = () => {}

export const EpisodeItem = ({ episode }: EpisodeItemProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { thumbnail, audio_length_sec, title } = episode

  return (
    <div className={styles.Episode}>
      <div className={styles.ImageWrapper}>
        <img className={styles.Image} src={thumbnail} alt='' />
      </div>
      <div className={styles.Content}>
        <div>
          <EllipsisText tagName='h4' className={styles.Title}>
            {title}
          </EllipsisText>
          <span className={styles.Duration}>
            {new Date(audio_length_sec * 1000).toISOString().substr(11, 8)}
          </span>
        </div>

        <PlaySvg
          role='button'
          tabIndex={0}
          className={styles.Play}
          onClick={() => dispatch(playEpisode({ podcastId, episode }))}
        />
      </div>
    </div>
  )
}

export default EpisodeItem