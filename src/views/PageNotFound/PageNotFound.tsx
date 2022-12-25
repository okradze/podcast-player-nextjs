import { PageNotFoundSvg } from '@/svg'
import styles from './PageNotFound.module.scss'

const PageNotFound = () => (
  <section className={styles.section}>
    <h2 className={styles.title}>Page Not Found</h2>

    <div className={styles.svgWrapper}>
      <PageNotFoundSvg className={styles.svg} />
    </div>
  </section>
)

export default PageNotFound
