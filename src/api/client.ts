import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8000/v1',
  withCredentials: true,
})

export default client
