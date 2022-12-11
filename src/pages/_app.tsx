import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import { wrapper } from '../store'
import '../styles/globals.scss'

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
