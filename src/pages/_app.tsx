import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Sidebar from '../components/Sidebar'
import { store, persistor } from '../store'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className='container app'>
          <Sidebar />
          <div className='main-page'>
            <Component {...pageProps} />
          </div>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
