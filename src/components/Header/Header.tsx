import useMe from '../../hooks/useMe'
import ProfileButton from '../ProfileButton'
import SearchBar from '../SearchBar'
import styles from './Header.module.scss'

const Header = () => {
  const me = useMe()

  return (
    <header className={styles.header}>
      <SearchBar />
      {me && <ProfileButton fullName={me.fullName} />}
    </header>
  )
}

export default Header
