import { useSelector } from 'react-redux'

import AudioPlayer from './AudioPlayer'
import { RootState } from '@/store/rootReducer'

const AudioPlayerContainer = () => {
  const episode = useSelector((state: RootState) => !!state.playingPodcast.playingEpisode)

  if (episode) {
    return <AudioPlayer />
  }

  return null
}

export default AudioPlayerContainer
