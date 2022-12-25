import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import useMe from '@/hooks/useMe'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  const router = useRouter()
  const me = useMe()
  const playingPodcastId = useSelector((state: RootState) => state.playingPodcast.podcastId)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const closeSidebar = () => {
    if (isSidebarVisible) setIsSidebarVisible(false)
  }

  return (
    <aside>
      <span
        tabIndex={0}
        role='button'
        aria-label='Toggle menu'
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className={styles.toggle}
      >
        <span
          className={`${styles.toggleIcon} ${isSidebarVisible ? styles.toggleIconWhenVisible : ''}`}
        />
      </span>

      <section
        className={`${styles.sidebar} ${isSidebarVisible ? styles.sidebarMobileVisible : ''}`}
      >
        <h1 className={styles.logo}>
          <Link href='/' scroll={false}>
            <a onClick={closeSidebar} className={styles.logoLink}>
              Podcast
            </a>
          </Link>
        </h1>

        <nav className={styles.nav}>
          <h4 className={styles.title}>PODCAST</h4>
          <ul>
            <li className={styles.listItem}>
              <Link href='/' scroll={false}>
                <a
                  onClick={closeSidebar}
                  className={`${styles.link} ${router.pathname === '/' ? styles.activeLink : 0}`}
                >
                  <HomeIcon className={styles.linkIcon} />
                  Home
                </a>
              </Link>
            </li>

            <li className={styles.listItem}>
              <Link href='/discover' scroll={false}>
                <a
                  onClick={closeSidebar}
                  className={`${styles.link} ${
                    router.pathname === '/discover' ? styles.activeLink : ''
                  }`}
                >
                  <SearchIcon className={styles.linkIcon} />
                  Discover
                </a>
              </Link>
            </li>

            {me && (
              <li className={styles.listItem}>
                <Link href='/favorites' scroll={false}>
                  <a
                    onClick={closeSidebar}
                    className={`${styles.link} ${
                      router.pathname === '/favorites' ? styles.activeLink : ''
                    }`}
                  >
                    {router.pathname === '/favorites' ? (
                      <FavoriteIcon className={styles.linkIcon} />
                    ) : (
                      <FavoriteBorderIcon className={styles.linkIcon} />
                    )}
                    Favorites
                  </a>
                </Link>
              </li>
            )}

            {playingPodcastId && (
              <li className={styles.listItem}>
                <Link href={`/podcast/${playingPodcastId}`} scroll={false}>
                  <a
                    onClick={closeSidebar}
                    className={`${styles.link} ${
                      router.asPath === `/podcast/${playingPodcastId}` ? styles.activeLink : ''
                    }`}
                  >
                    <PodcastsIcon className={styles.linkIcon} />
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
