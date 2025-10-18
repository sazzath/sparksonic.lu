/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com', 'plus.unsplash.com', 'images.pexels.com'],
    unoptimized: false,
  },
}

module.exports = nextConfig