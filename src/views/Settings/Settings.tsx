import useMe from '@/hooks/useMe'
import ChangePasswordForm from './components/ChangePasswordForm'
import UpdateUserForm from './components/UpdateUserForm'
import styles from './Settings.module.scss'

const Settings = () => {
  const me = useMe()
  if (!me) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Settings</h2>

      <section className={styles.forms}>
        <UpdateUserForm />
        <ChangePasswordForm />
      </section>
    </section>
  )
}

export default Settings
