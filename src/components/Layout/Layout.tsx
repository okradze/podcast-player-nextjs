import NextNProgress from 'nextjs-progressbar'
import ErrorBoundary from '../ErrorBoundary'
import Sidebar from '../Sidebar'
import AudioPlayer from '../AudioPlayer'
import Header from '../Header'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <ErrorBoundary>
    <NextNProgress color='#5071ed' height={4} options={{ showSpinner: false }} />
    <div className='container app'>
      <Sidebar />
      <AudioPlayer />
      <div className='main-page'>
        <Header />
        {children}
      </div>
    </div>
  </ErrorBoundary>
)

export default Layout
