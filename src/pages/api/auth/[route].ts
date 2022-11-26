import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestHeaders, AxiosError } from 'axios'
import { client } from '../../../api/api'

const routes = ['signup', 'signin', 'signout', 'refresh']

// Receives request and proxies to our external API server
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { route } = req.query

  if (req.method !== 'POST' || !route || typeof route !== 'string' || !routes.includes(route))
    return res.status(404).send('404 Not Found')

  try {
    const { data, headers, status } = await client.post(`/auth/${route}`, req.body, {
      headers: req.headers as AxiosRequestHeaders,
    })

    Object.entries(headers).forEach(header => res.setHeader(header[0], header[1] as string))

    res.status(status).send(data)
  } catch (error: unknown) {
    if (!axios.isAxiosError(error)) return res.status(500).send({ message: 'Error' })
    const err = error as AxiosError
    const { response } = err
    const status = response?.status || 500

    // Do not send unauthorized status on refresh
    res.status(route === 'refresh' ? 400 : status).send(response?.data)
  }
}
