/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['fakestoreapi.com', 'picsum.photos'],
  },
  output: 'standalone',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://products-blue-beta.vercel.app/api/:path*'
  //     }
  //   ]
  // }
  // "rewrites": [
  //   { "source": "/about", "destination": "/about-our-company.html" },
  // ]
}



module.exports = nextConfig
