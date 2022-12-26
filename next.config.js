/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['fakestoreapi.com', 'picsum.photos'],
  },
  output:'standalone',
}



module.exports = nextConfig
