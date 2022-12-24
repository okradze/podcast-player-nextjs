import { AnyAction, Store } from '@reduxjs/toolkit'
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { authApi } from '@/api'
import { wrapper } from '@/store'
import { RootState } from '@/store/rootReducer'
import { Me, reset, setMe } from '@/store/auth/authSlice'

export type ContextWithStore = Omit<
  GetServerSidePropsContext & {
    store: Store<RootState, AnyAction>
  },
  'resolvedUrl'
>

export type CallbackArgs = {
  user: Me | null
  accessToken?: string
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
}

export const withAuth = ({ callback }: WithAuthProps) =>
  wrapper.getServerSideProps(store => async ctx => {
    let accessToken = ctx.req.cookies['accessToken']
    const refreshToken = ctx.req.cookies['refreshToken']

    if (!refreshToken) {
      store.dispatch(reset())
      return callback ? callback({ user: null, store, ctx }) : { props: {} }
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
        return callback ? callback({ user: null, store, ctx }) : { props: {} }
      }
    }

    let user: Me | null = null

    if (accessToken) {
      user = await getAuthUser(accessToken)
      store.dispatch(setMe(user))
    }

    return callback ? callback({ user, accessToken, store, ctx }) : { props: {} }
  })
