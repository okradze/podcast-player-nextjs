import type { NextPage } from 'next'
import Head from 'next/head'
import { createRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PodcastList from '../../components/PodcastList'
import Spinner from '../../components/Spinner'
import useOnScreen from '../../hooks/useOnScreen'
import { fetchPodcasts } from '../../store/podcasts/podcastsSlice'
import { RootState } from '../../store/rootReducer'

const Favorites: NextPage = () => {
  // const dispatch = useDispatch()
  // const { podcasts, isFetching, hasNextPage, lastFetchedPage } = useSelector(
  //   (state: RootState) => state.podcasts,
  // )
  // const infiniteScrollRef = createRef<HTMLDivElement>()
  // const isLoadMoreButtonOnScreen = useOnScreen(infiniteScrollRef)

  // useEffect(() => {
  //   if (isLoadMoreButtonOnScreen && lastFetchedPage) {
  //     fetchPodcasts(dispatch, lastFetchedPage + 1)
  //   }
  // }, [dispatch, isLoadMoreButtonOnScreen, lastFetchedPage])

  return (
    <div>
      <Head>
        <title>Favorites - Podcast Player</title>
      </Head>
    </div>
  )
}

export default Favorites
