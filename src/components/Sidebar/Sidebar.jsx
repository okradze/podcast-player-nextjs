import React, { useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import HomeSvg from '../../svg/HomeSvg'
import SearchSvg from '../../svg/SearchSvg'
import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  const playingPodcastId = 10
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  return (
    <aside>
      <span
        tabIndex={0}
        role='button'
        aria-label='Toggle menu'
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className={styles.Toggle}
      >
        <span
          className={`${styles.ToggleIcon} ${
            isSidebarVisible ? styles.ToggleIconWhenVisible : ''
          }`}
        />
      </span>

      <section
        className={`${styles.Sidebar} ${
          isSidebarVisible ? styles.SidebarMobileVisible : ''
        }`}
      >
        <h1 className={styles.Logo}>
          <Link href='/'>
            <a className={styles.LogoLink}>Podcast</a>
          </Link>
        </h1>

        <nav className={styles.Nav}>
          <h4 className={styles.Title}>PODCAST</h4>
          <ul>
            <li className={styles.ListItem}>
              <Link
                href='/'
                // className={styles.Link}
                // activeClassName={styles.ActiveLink}
              >
                <a className={styles.Link}>
                  <HomeSvg className={styles.LinkIcon} />
                  Home
                </a>
              </Link>
            </li>

            <li className={styles.ListItem}>
              <Link
                href='/discover'

                // activeClassName={styles.ActiveLink}
              >
                <a className={styles.Link}>
                  <SearchSvg className={styles.LinkIcon} />
                  Discover
                </a>
              </Link>
            </li>

            {playingPodcastId && (
              <li className={styles.ListItem}>
                <Link
                  href={`/podcast/${playingPodcastId}`}
                  // activeClassName={playingPodcastId ? styles.ActiveLink : ''}
                >
                  <a className={styles.Link}>
                    <SearchSvg className={styles.LinkIcon} />
                    Now Playing
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </section>
    </aside>
  )
}

export default Sidebar
