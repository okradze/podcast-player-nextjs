/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['cdn-images-1.listennotes.com', 'production.listennotes.com'],
  },
}

module.exports = nextConfig
