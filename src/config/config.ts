const env = process.env.NODE_ENV

const config = {
  development: {
    apiUrlV1: 'http://localhost:3000/api/v1/',
  },
  production: {
    apiUrlV1: 'https://okradze-podcasts.netlify.app/api/v1/',
  },
  test: {
    apiUrlV1: 'http://localhost:3000/api/v1/',
  },
}

export default config[env]
