/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com', 'plus.unsplash.com'],
    unoptimized: false,
  },
  i18n: {
    locales: ['en', 'fr', 'de', 'lb', 'es', 'pt'],
    defaultLocale: 'en',
    localeDetection: true,
  },
}

module.exports = nextConfig