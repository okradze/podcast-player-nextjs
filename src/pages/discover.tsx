import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { createRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import listenNotesApi, { ICuratedPodcasts } from '../api/listenNotesApi'
import { RootState } from '../store/rootReducer'
import {
  fetchPodcastLists,
  setPodcastLists,
} from '../store/discoverPodcasts/discoverPodcastsSlice'
import useOnScreen from '../hooks/useOnScreen'
import PodcastList from '../components/PodcastList'
import Spinner from '../components/Spinner'

type DiscoverProps = {
  initialLists: ICuratedPodcasts
}

const Discover: NextPage<DiscoverProps> = ({ initialLists }) => {
  const dispatch = useDispatch()
  const {
    curated_lists: lists,
    isFetching,
    lastFetchedPage,
    hasNextPage,
  } = useSelector((state: RootState) => state.discoverPodcasts)
  const infiniteScrollRef = createRef<HTMLDivElement>()
  const isLoadMoreButtonOnScreen = useOnScreen(infiniteScrollRef)

  useEffect(() => {
    if (!lists.length) {
      dispatch(setPodcastLists(initialLists))
    }
  }, [dispatch, initialLists, lists.length])

  useEffect(() => {
    if (isLoadMoreButtonOnScreen && lastFetchedPage) {
      fetchPodcastLists(dispatch, lastFetchedPage + 1)
    }
  }, [dispatch, isLoadMoreButtonOnScreen, lastFetchedPage])

  return (
    <div>
      <Head>
        <title>Discover Podcasts - Podcast Player</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {lists.length > 0 &&
        lists.map(({ id, title, podcasts }) => (
          <PodcastList key={id} title={title} podcasts={podcasts} />
        ))}
      {isFetching && <Spinner />}
      {!isFetching && hasNextPage && (
        <div style={{ minHeight: '1px' }} ref={infiniteScrollRef} />
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<DiscoverProps> = async () => {
  const { data } = await listenNotesApi.fetchCuratedPodcasts(1)

  return {
    props: {
      initialLists: data,
    },
  }
}

export default Discover
