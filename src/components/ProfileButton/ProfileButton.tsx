import Link from 'next/link'
import * as authApi from '../../api/auth'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import styles from './ProfileButton.module.scss'
import { useDispatch } from 'react-redux'
import { reset } from '../../store/auth/authSlice'

type ProfileButtonProps = {
  fullName: string
}

export const ProfileButton = ({ fullName }: ProfileButtonProps) => {
  const dispatch = useDispatch()

  const handleSignout = async () => {
    await authApi.signout()
    dispatch(reset())
  }

  return (
    <section className={styles.section}>
      <button tabIndex={0} className={styles.button}>
        <div className={styles.avatar}>{fullName[0]}</div>
        <p className={styles.name}>{fullName}</p>
      </button>

      <section className={styles.dropdown}>
        <ul className={styles.dropdownList}>
          <li>
            <Link href='/settings'>
              <a className={styles.dropdownButton} href=''>
                <SettingsIcon className={styles.dropdownIcon} /> Settings
              </a>
            </Link>
          </li>
          <li>
            <button onClick={handleSignout} className={styles.dropdownButton}>
              <LogoutIcon className={styles.dropdownIcon} />
              Sign Out
            </button>
          </li>
        </ul>
      </section>
    </section>
  )
}

export default ProfileButton
