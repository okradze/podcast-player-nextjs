import { useState, useEffect } from 'react'
import { podcastsApi } from '@/api'
import { ITypeaheadPodcast } from '@/api/podcasts'
import Spinner from '@/components/Spinner'
import SearchBarItem from './SearchBarItem'
import styles from './SearchBar.module.scss'

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<ITypeaheadPodcast[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchTerm) {
      const search = async () => {
        setIsLoading(true)
        const {
          data: { podcasts },
        } = await podcastsApi.fetchTypeahead(searchTerm)
        if (podcasts.length) setSearchResults(podcasts)
        setIsLoading(false)
      }

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
