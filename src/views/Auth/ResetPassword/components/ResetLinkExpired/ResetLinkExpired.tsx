import { NoDataIllustrationSvg } from '@/svg'
import styles from './ResetLinkExpired.module.scss'

const ResetLinkExpired = () => (
  <section className={styles.section}>
    <h2 className={styles.title}>Reset link is expired</h2>
    <div className={styles.svgWrapper}>
      <NoDataIllustrationSvg className={styles.svg} />
    </div>
  </section>
)

export default ResetLinkExpired
