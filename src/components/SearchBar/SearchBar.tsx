import { useState, useEffect } from 'react'
import { clientApi } from '@/api'
import { ITypeaheadPodcast } from '@/api/podcasts'
import Spinner from '@/components/Spinner'
import SearchBarItem from './SearchBarItem'
import styles from './SearchBar.module.scss'

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<ITypeaheadPodcast[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const search = async () => {
      setIsLoading(true)
      const { data } = await clientApi.podcasts.fetchTypeahead(searchTerm)
      if (data?.podcasts.length) setSearchResults(data.podcasts)
      setIsLoading(false)
    }

    if (searchTerm) {
      search()
    } else {
      setSearchResults(undefined)
    }
  }, [searchTerm])

  return (
    <section className={styles.container}>
      <input
        className={`${styles.input} ${searchTerm && styles.inputWhenSearching}`}
        type='search'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder='Search shows and podcasts'
      />
      {searchTerm && (
        <ul className={styles.results}>
          {isLoading && (
            <div className={styles.spinner}>
              <Spinner />
            </div>
          )}
          {searchResults?.map(podcast => (
            <SearchBarItem clearSearch={() => setSearchTerm('')} key={podcast.id} {...podcast} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default SearchBar
