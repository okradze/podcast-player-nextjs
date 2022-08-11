import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store'
import ErrorBoundary from '../components/ErrorBoundary'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import '../styles/globals.scss'
import AudioPlayer from '../components/AudioPlayer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ErrorBoundary>
          <div className='container app'>
            <Sidebar />
            <AudioPlayer />
            <div className='main-page'>
              <SearchBar />
              <Component {...pageProps} />
            </div>
          </div>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
