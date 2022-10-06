/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const rewrites = () => ([
  {
      source: '/courses',
      destination: '/search'
  }
])

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true
  },
  i18n,
  rewrites
}

module.exports = nextConfig
