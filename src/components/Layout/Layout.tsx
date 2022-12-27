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
      <main className='main-page'>
        <Header />
        {children}
      </main>
    </div>
  </ErrorBoundary>
)

export default Layout
