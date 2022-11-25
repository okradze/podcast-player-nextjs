import styles from './ProfileButton.module.scss'

type ProfileButtonProps = {
  fullName: string
}

export const ProfileButton = ({ fullName }: ProfileButtonProps) => (
  <button className={styles.Button}>
    <div className={styles.Avatar}>{fullName[0]}</div>
    <p className={styles.Name}>{fullName}</p>
  </button>
)

export default ProfileButton
