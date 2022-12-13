import Head from 'next/head'
import PodcastIllustrationSvg from '../../svg/PodcastIllustrationSvg'
import styles from './AuthLayout.module.scss'

type AuthLayoutProps = {
  children: React.ReactNode
  title: string
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => (
  <section className={styles.section}>
    <Head>
      <title>{title}</title>
    </Head>

    <PodcastIllustrationSvg className={styles.illustration} />
    {children}
  </section>
)

export default AuthLayout
