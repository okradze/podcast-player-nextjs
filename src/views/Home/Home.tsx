import type { NextPage } from 'next'
import Head from 'next/head'
import { createRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IBestPodcasts } from '../../api/api'
import PodcastList from '../../components/PodcastList'
import Spinner from '../../components/Spinner'
import useOnScreen from '../../hooks/useOnScreen'
import { fetchPodcasts, setPodcasts } from '../../store/podcasts/podcastsSlice'
import { RootState } from '../../store/rootReducer'

export type HomeProps = {
  initialPodcasts: IBestPodcasts
}

const Home: NextPage<HomeProps> = ({ initialPodcasts }) => {
  const dispatch = useDispatch()
  const { podcasts, isFetching, hasNextPage, lastFetchedPage } = useSelector(
    (state: RootState) => state.podcasts,
  )
  const infiniteScrollRef = createRef<HTMLDivElement>()
  const isLoadMoreButtonOnScreen = useOnScreen(infiniteScrollRef)

  useEffect(() => {
    if (!podcasts.length) {
      dispatch(setPodcasts(initialPodcasts))
    }
  }, [dispatch, initialPodcasts, podcasts.length])

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

      {podcasts.length > 0 && <PodcastList podcasts={podcasts} />}
      {isFetching && <Spinner />}
      {!isFetching && hasNextPage && <div style={{ minHeight: '1px' }} ref={infiniteScrollRef} />}
    </div>
  )
}

export default Home
