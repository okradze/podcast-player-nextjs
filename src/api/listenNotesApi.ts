import axios from 'axios'

const client = axios.create({
  baseURL: 'https://listen-api.listennotes.com/api/v2',
  headers: {
    'X-ListenAPI-Key': process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY || '',
  },
})

export const fetchBestPodcasts = (page: number) =>
  client.get(`/best_podcasts?page=${page}`)

const listenNotesApi = {
  fetchBestPodcasts,
}

export default listenNotesApi
