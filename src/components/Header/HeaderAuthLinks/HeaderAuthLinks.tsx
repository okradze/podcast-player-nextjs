import Link from 'next/link'
import Button from '@/components/Button'
import styles from './HeaderAuthLinks.module.scss'

const HeaderAuthLinks = () => (
  <ul className={styles.links}>
    <li>
      <Link passHref href='/auth/signin'>
        <Button className={styles.link} element='link' variant='outlined'>
          Sign In
        </Button>
      </Link>
    </li>

    <li>
      <Link passHref href='/auth/signup'>
        <Button className={styles.link} element='link' variant='contained'>
          Sign Up
        </Button>
      </Link>
    </li>
  </ul>
)

export default HeaderAuthLinks
