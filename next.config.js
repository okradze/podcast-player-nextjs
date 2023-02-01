/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['cdn-images-1.listennotes.com', 'production.listennotes.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'https://podcast-player-nest-api.herokuapp.com/:path/*'
            : 'http://localhost:8000/:path*',
      },
    ]
  },
}

module.exports = nextConfig
