import type { NextPage } from 'next'
import Head from 'next/head'
import { createRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { fetchPodcasts } from '@/store/podcasts/podcastsSlice'
import useOnScreen from '@/hooks/useOnScreen'
import PodcastList from '@/components/PodcastList'
import Spinner from '@/components/Spinner'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const { podcasts, isFetching, hasNextPage, lastFetchedPage } = useSelector((state: RootState) => state.podcasts)
  const infiniteScrollRef = createRef<HTMLDivElement>()
  const isLoadMoreButtonOnScreen = useOnScreen(infiniteScrollRef)

  useEffect(() => {
    if (isLoadMoreButtonOnScreen && lastFetchedPage) {
      fetchPodcasts(dispatch, lastFetchedPage + 1)
    }
  }, [dispatch, isLoadMoreButtonOnScreen, lastFetchedPage])

  return (
    <div>
      <Head>
        <title>Home - Podcast Player</title>
      </Head>

      {podcasts.length > 0 && <PodcastList title='Popular Podcasts' podcasts={podcasts} />}
      {isFetching && <Spinner />}
      {!isFetching && hasNextPage && <div style={{ minHeight: '1px' }} ref={infiniteScrollRef} />}
    </div>
  )
}

export default Home
