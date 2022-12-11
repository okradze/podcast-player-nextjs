import { AnyAction, Store } from '@reduxjs/toolkit'
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import * as authApi from '../api/auth'
import { wrapper } from '../store'
import { Me, reset, setMe } from '../store/auth/authSlice'
import { RootState } from '../store/rootReducer'

export type ContextWithStore = Omit<
  GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>
  },
  'resolvedUrl'
>

export type CallbackArgs = {
  user: Me | null
  accessToken: string | undefined
  store: Store<RootState, AnyAction>
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
}

export type Callback = (
  params: CallbackArgs,
) => Promise<GetServerSidePropsResult<{ [key: string]: any }>>

export const getAuthUser = async (token: string) => {
  try {
    const { data } = await authApi.me(token)
    return data
  } catch (error) {
    return null
  }
}

type WithAuthProps = {
  callback?: Callback
  redirect?: boolean
}

export const withAuth = ({ callback, redirect }: WithAuthProps) =>
  wrapper.getServerSideProps(store => async ctx => {
    let accessToken = ctx.req.cookies['accessToken']
    const refreshToken = ctx.req.cookies['refreshToken']

    if (!refreshToken) {
      store.dispatch(reset())

      if (redirect) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }

    if (!accessToken) {
      try {
        const { data, headers } = await authApi.refresh(refreshToken)
        const cookies = headers['set-cookie']
        accessToken = data.accessToken

        if (cookies) {
          ctx.res.setHeader('set-cookie', cookies)
        }
      } catch (error) {
        store.dispatch(reset())

        if (redirect) {
          return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          }
        }
      }
    }

    let user: Me | null = null

    if (accessToken) {
      user = await getAuthUser(accessToken)
      store.dispatch(setMe(user))

      if (!user && redirect) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }

    return callback ? callback({ user, accessToken, store, ctx }) : { props: {} }
  })
