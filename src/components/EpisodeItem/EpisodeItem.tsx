import React from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { IEpisode } from '@/api/podcasts'
import { playEpisode } from '@/store/playingPodcast/playingPodcastSlice'
import { PlaySvg } from '@/svg'
import EllipsisText from '../EllipsisText'
import styles from './EpisodeItem.module.scss'

type EpisodeItemProps = {
  episode: IEpisode
  podcastId: string
}

export const EpisodeItem = ({ episode, podcastId }: EpisodeItemProps) => {
  const dispatch = useDispatch()
  const { thumbnail, audio_length_sec, title } = episode

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

        <PlaySvg
          role='button'
          tabIndex={0}
          className={styles.Play}
          onClick={() => dispatch(playEpisode({ podcastId, episode }))}
        />
      </div>
    </li>
  )
}

export default EpisodeItem
