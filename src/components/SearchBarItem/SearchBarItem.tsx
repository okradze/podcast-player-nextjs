import Image from 'next/image'
import Link from 'next/link'
import { ITypeaheadPodcast } from '../../api/listenNotesApi'
import EllipsisText from '../EllipsisText/EllipsisText'
import styles from './SearchBarItem.module.scss'

type SearchBarItemProps = ITypeaheadPodcast & {
  clearSearch: () => void
}

export const SearchBarItem = ({
  id,
  thumbnail,
  publisher_original,
  title_original,
  clearSearch,
}: SearchBarItemProps) => (
  <li className={styles.Item}>
    <Link href={`/podcast/${id}`}>
      <a className={styles.Link} onClick={() => clearSearch()}>
        <figure className={styles.Image}>
          <Image width={40} height={40} src={thumbnail} alt='' />
        </figure>
        <div>
          <EllipsisText tagName='h4' className={styles.Title}>
            {title_original}
          </EllipsisText>
          <EllipsisText tagName='p' className={styles.Publisher}>
            {publisher_original}
          </EllipsisText>
        </div>
      </a>
    </Link>
  </li>
)

export default SearchBarItem
