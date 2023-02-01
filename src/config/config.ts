const env = process.env.NODE_ENV

const config = {
  development: {
    apiUrl: 'http://localhost:3000',
  },
  production: {
    apiUrl: 'https://okradze-podcasts.netlify.app',
  },
  test: {
    apiUrl: 'http://localhost:3000',
  },
}

export default config[env]
