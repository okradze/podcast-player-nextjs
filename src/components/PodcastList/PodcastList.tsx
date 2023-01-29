import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import PodcastItem from './PodcastItem'
import { IPodcast } from '@/api/podcasts'

import styles from './PodcastList.module.scss'

type PodcastListProps = {
  podcasts: IPodcast[]
  title?: string
  isSmallerTitle?: boolean
}

export const PodcastList = ({ podcasts, title, isSmallerTitle }: PodcastListProps) => (
  <section className={styles.section}>
    <h2 className={`${styles.title} ${isSmallerTitle ? styles.smallTitle : ''}`}>{title}</h2>
    <TransitionGroup component='ul' className={styles.list}>
      {podcasts.map(podcast => (
        <CSSTransition
          key={podcast.id}
          timeout={300}
          unmountOnExit
          classNames={{
            exitActive: styles.itemExitActive,
          }}
        >
          <PodcastItem {...podcast} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  </section>
)

export default React.memo(PodcastList)
