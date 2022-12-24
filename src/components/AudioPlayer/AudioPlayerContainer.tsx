import { useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import AudioPlayer from './AudioPlayer'

const AudioPlayerContainer = () => {
  const episode = useSelector((state: RootState) => !!state.playingPodcast.playingEpisode)

  if (episode) {
    return <AudioPlayer />
  }

  return null
}

export default AudioPlayerContainer
