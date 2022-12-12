import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import styles from './Sidebar.module.scss'
import useMe from '../../hooks/useMe'

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
            <a onClick={closeSidebar} className={styles.LogoLink}>
              Podcast
            </a>
          </Link>
        </h1>

        <nav className={styles.Nav}>
          <h4 className={styles.Title}>PODCAST</h4>
          <ul>
            <li className={styles.ListItem}>
              <Link href='/' scroll={false}>
                <a
                  onClick={closeSidebar}
                  className={`${styles.Link} ${router.pathname === '/' ? styles.ActiveLink : 0}`}
                >
                  <HomeIcon className={styles.LinkIcon} />
                  Home
                </a>
              </Link>
            </li>

            <li className={styles.ListItem}>
              <Link href='/discover' scroll={false}>
                <a
                  onClick={closeSidebar}
                  className={`${styles.Link} ${
                    router.pathname === '/discover' ? styles.ActiveLink : 0
                  }`}
                >
                  <SearchIcon className={styles.LinkIcon} />
                  Discover
                </a>
              </Link>
            </li>

            {me && (
              <li className={styles.ListItem}>
                <Link href='/favorites' scroll={false}>
                  <a
                    onClick={closeSidebar}
                    className={`${styles.Link} ${
                      router.pathname === '/favorites' ? styles.ActiveLink : 0
                    }`}
                  >
                    {router.pathname === '/favorites' ? (
                      <FavoriteIcon className={styles.LinkIcon} />
                    ) : (
                      <FavoriteBorderIcon className={styles.LinkIcon} />
                    )}
                    Favorites
                  </a>
                </Link>
              </li>
            )}

            {playingPodcastId && (
              <li className={styles.ListItem}>
                <Link href={`/podcast/${playingPodcastId}`} scroll={false}>
                  <a
                    onClick={closeSidebar}
                    className={`${styles.Link} ${
                      router.asPath === `/podcast/${playingPodcastId}` ? styles.ActiveLink : 0
                    }`}
                  >
                    <PodcastsIcon className={styles.LinkIcon} />
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
