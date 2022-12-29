import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import Slider from 'rc-slider/lib/Slider'
import { RootState } from '@/store/rootReducer'
import {
  play,
  pause,
  setVolume,
  setCurrentTime,
  toggleMinimize,
} from '@/store/playingPodcast/playingPodcastSlice'
import { IEpisode } from '@/api/podcasts'
import { VolumeSvg } from '@/svg'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import EllipsisText from '../EllipsisText'
import 'rc-slider/assets/index.css'
import styles from './AudioPlayer.module.scss'

const formatTime = (time: number) => {
  if (time) {
    const SECONDS_IN_HOUR = 3600
    const date = new Date(Math.floor(time * 1000)).toISOString()

    if (time < SECONDS_IN_HOUR) {
      return date.substr(14, 5)
    }
    return date.substr(11, 8)
  }
}

const AudioPlayer = () => {
  const { playingEpisode, podcastId, isPlaying, currentTime, volume, minimized } = useSelector(
    (state: RootState) => state.playingPodcast,
  )
  const dispatch = useDispatch()

  const { thumbnail, title, audio: audioSrc, audio_length_sec } = playingEpisode as IEpisode

  const { current: audio } = useRef(new Audio())

  useEffect(() => {
    audio.src = audioSrc
    audio.currentTime = currentTime
    audio.play().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, audioSrc])

  useEffect(() => {
    const pauseListener = () => dispatch(pause())
    const playListener = () => dispatch(play())
    const timeUpdateListener = () => {
      dispatch(setCurrentTime(audio.currentTime))
    }
    const keydownListener = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault()
      }
      if (e.code === 'Space') {
        audio.paused ? audio.play() : audio.pause()
      } else if (e.code === 'ArrowLeft') {
        audio.currentTime -= 10
      } else if (e.code === 'ArrowRight') {
        audio.currentTime += 10
      }
    }

    audio.addEventListener('pause', pauseListener)
    audio.addEventListener('play', playListener)
    audio.addEventListener('timeupdate', timeUpdateListener)
    window.addEventListener('keydown', keydownListener)

    return () => {
      audio.removeEventListener('pause', pauseListener)
      audio.removeEventListener('play', playListener)
      audio.removeEventListener('timeupdate', timeUpdateListener)
      window.removeEventListener('keydown', keydownListener)
    }
  }, [dispatch, audio])

  return (
    <div className={`${styles.AudioPlayer} ${minimized ? styles.AudioPlayerMinimized : ''}`}>
      <div className={styles.MinimizeWrapper}>
        <span
          onClick={() => dispatch(toggleMinimize())}
          tabIndex={0}
          role='button'
          className={styles.Minimize}
        />
      </div>

      <div className={styles.EpisodeWrapper}>
        <div className={styles.ThumbnailWrapper}>
          <Image width={40} height={40} className={styles.Thumbnail} src={thumbnail} alt='' />
        </div>

        <Link href={`/podcast/${podcastId}`}>
          <a className={styles.Title}>
            <EllipsisText tagName='span' className={styles.Title}>
              {title}
            </EllipsisText>
          </a>
        </Link>
      </div>

      <div className={styles.ControllsWrapper}>
        <button
          className={styles.playButton}
          onClick={() => (isPlaying ? audio.pause() : audio.play())}
        >
          {isPlaying ? (
            <PauseCircleIcon className={styles.playButtonSvg} />
          ) : (
            <PlayCircleIcon className={styles.playButtonSvg} />
          )}
        </button>

        {!minimized && (
          <>
            <div className={styles.DurationWrapper}>
              <span className={styles.Time}>{formatTime(currentTime)}</span>

              <div className={styles.Duration}>
                <Slider
                  onChange={value => {
                    dispatch(setCurrentTime(value))
                    audio.currentTime = value
                  }}
                  value={currentTime}
                  step={1}
                  min={0}
                  max={audio_length_sec}
                  className={styles.Slider}
                />
              </div>

              <span className={styles.Time}>-{formatTime(audio.duration - audio.currentTime)}</span>
            </div>

            <div className={styles.VolumeWrapper}>
              <div className={styles.VolumeSlider}>
                <Slider
                  tabIndex={0}
                  onChange={value => {
                    audio.volume = value
                    dispatch(setVolume(value))
                  }}
                  value={volume}
                  step={0.01}
                  min={0.0}
                  max={1.0}
                  vertical
                  className={styles.Slider}
                />
              </div>
              <VolumeSvg className={styles.VolumeIcon} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AudioPlayer
