import styles from './CustomPageError.module.scss'

type CustomPageErrorProps = {
  title: string
}

const CustomPageError = ({ title }: CustomPageErrorProps) => (
  <section className={styles.section}>
    <h1 className={styles.title}>{title}</h1>
  </section>
)

export default CustomPageError
