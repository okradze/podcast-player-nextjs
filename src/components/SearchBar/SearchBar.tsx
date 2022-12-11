import { useState, useEffect } from 'react'
import api, { ITypeaheadPodcast } from '../../api/api'
import SearchBarItem from '../SearchBarItem'
import Spinner from '../Spinner'
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
        } = await api.fetchTypeahead(searchTerm)
        if (podcasts.length) setSearchResults(podcasts)
        setIsLoading(false)
      }

      search()
    } else {
      setSearchResults(undefined)
    }
  }, [searchTerm])

  return (
    <div className={styles.SearchBar}>
      <input
        className={`${styles.Input} ${searchTerm && styles.InputWhenSearching}`}
        type='search'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder='Search shows and podcasts'
      />
      {searchTerm && (
        <div className={styles.Results}>
          <ul>
            {isLoading && (
              <div className={styles.Spinner}>
                <Spinner />
              </div>
            )}
            {searchResults?.map(podcast => (
              <SearchBarItem clearSearch={() => setSearchTerm('')} key={podcast.id} {...podcast} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
