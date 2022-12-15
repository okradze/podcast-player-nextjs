import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Layout from '../components/Layout'
import { wrapper } from '../store'
import { StyledEngineProvider } from '@mui/material/styles'
import '../styles/globals.scss'

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        {/* @ts-ignore */}
        <PersistGate persistor={store.__persistor}>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </StyledEngineProvider>
  )
}

export default MyApp
