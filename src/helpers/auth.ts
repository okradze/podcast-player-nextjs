import { AnyAction, Store } from '@reduxjs/toolkit'
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Api } from '@/api'
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
  store: Store<RootState, AnyAction>
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
  api: Api
}

export type Callback = (
  params: CallbackArgs,
) => Promise<GetServerSidePropsResult<{ [key: string]: unknown }>>

type WithAuthProps = {
  callback?: Callback
}

export const withAuth = ({ callback }: WithAuthProps) =>
  wrapper.getServerSideProps(store => async ctx => {
    let accessToken = ctx.req.cookies['accessToken']
    const refreshToken = ctx.req.cookies['refreshToken']
    let user: Me | null = null

    const api = new Api()

    if (!refreshToken) {
      store.dispatch(reset())
      return callback ? callback({ user, store, ctx, api }) : { props: {} }
    }

    if (!accessToken) {
      const { data, error, headers } = await api.auth.refresh(refreshToken)

      if (error) {
        store.dispatch(reset())
        return callback ? callback({ user, store, ctx, api }) : { props: {} }
      }

      const cookies = headers['set-cookie']
      accessToken = data.accessToken

      if (cookies) {
        ctx.res.setHeader('set-cookie', cookies)
      }
    }

    if (accessToken) {
      api.setAuthorizationToken(accessToken)
      const { data, error } = await api.auth.me()
      user = error ? null : data
      store.dispatch(setMe(user))
    }

    return callback ? callback({ user, store, ctx, api }) : { props: {} }
  })
