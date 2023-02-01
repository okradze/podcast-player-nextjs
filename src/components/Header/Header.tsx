import HeaderAuthLinks from './HeaderAuthLinks'
import ProfileButton from './ProfileButton'
import SearchBar from '../SearchBar'
import useMe from '@/hooks/useMe'

import styles from './Header.module.scss'

const Header = () => {
  const me = useMe()

  return (
    <header className={styles.header}>
      <SearchBar />
      {me ? <ProfileButton fullName={me.fullName} /> : <HeaderAuthLinks />}
    </header>
  )
}

export default Header
