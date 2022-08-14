import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import HomeSvg from '../../svg/HomeSvg'
import SearchSvg from '../../svg/SearchSvg'
import PodcastSvg from '../../svg/PodcastSvg'
import styles from './Sidebar.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'

export const Sidebar = () => {
  const router = useRouter()
  const playingPodcastId = useSelector((state: RootState) => state.playingPodcast.podcastId)
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
          className={`${styles.ToggleIcon} ${isSidebarVisible ? styles.ToggleIconWhenVisible : ''}`}
        />
      </span>

      <section
        className={`${styles.Sidebar} ${isSidebarVisible ? styles.SidebarMobileVisible : ''}`}
      >
        <h1 className={styles.Logo}>
          <Link href='/' scroll={false}>
            <a className={styles.LogoLink}>Podcast</a>
          </Link>
        </h1>

        <nav className={styles.Nav}>
          <h4 className={styles.Title}>PODCAST</h4>
          <ul>
            <li className={styles.ListItem}>
              <Link href='/' scroll={false}>
                <a className={`${styles.Link} ${router.pathname === '/' ? styles.ActiveLink : 0}`}>
                  <HomeSvg className={styles.LinkIcon} />
                  Home
                </a>
              </Link>
            </li>

            <li className={styles.ListItem}>
              <Link href='/discover' scroll={false}>
                <a
                  className={`${styles.Link} ${
                    router.pathname === '/discover' ? styles.ActiveLink : 0
                  }`}
                >
                  <SearchSvg className={styles.LinkIcon} />
                  Discover
                </a>
              </Link>
            </li>

            {playingPodcastId && (
              <li className={styles.ListItem}>
                <Link href={`/podcast/${playingPodcastId}`} scroll={false}>
                  <a
                    className={`${styles.Link} ${
                      router.pathname === '/podcast/' ? styles.ActiveLink : 0
                    }`}
                  >
                    <PodcastSvg className={styles.LinkIcon} />
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
