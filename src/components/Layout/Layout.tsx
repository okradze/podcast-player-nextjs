import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NextNProgress from 'nextjs-progressbar'
import { store, persistor } from '../../store'
import ErrorBoundary from '../ErrorBoundary'
import Sidebar from '../Sidebar'
import AudioPlayer from '../AudioPlayer'
import SearchBar from '../SearchBar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ErrorBoundary>
        <NextNProgress color='#5071ed' height={4} options={{ showSpinner: false }} />
        <div className='container app'>
          <Sidebar />
          <AudioPlayer />
          <div className='main-page'>
            <SearchBar />
            {children}
          </div>
        </div>
      </ErrorBoundary>
    </PersistGate>
  </Provider>
)

export default Layout
