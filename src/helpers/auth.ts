import { GetServerSidePropsContext } from 'next'
import * as authApi from '../api/auth'
import { wrapper } from '../store'

export const getAuthUser = async (ctx: GetServerSidePropsContext) => {
  try {
    const { data } = await authApi.me(ctx.req.cookies['accessToken'])
    return data
  } catch (error) {
    return null
  }
}

export const withAuth = (cb: ) => wrapper.getServerSideProps((store) => (ctx) => {
  
})