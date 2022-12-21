import Head from 'next/head'
import PodcastIllustrationSvg from '../../svg/PodcastIllustrationSvg'
import styles from './AuthLayout.module.scss'

type AuthLayoutProps = {
  children: React.ReactNode
  pageTitle: string
  title: string
  subtitle: string
}

const AuthLayout = ({ children, pageTitle, title, subtitle }: AuthLayoutProps) => (
  <section className={styles.section}>
    <Head>
      <title>{pageTitle}</title>
    </Head>

    <PodcastIllustrationSvg className={styles.illustration} />

    <section className={styles.formSection}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      {children}
    </section>
  </section>
)

export default AuthLayout
