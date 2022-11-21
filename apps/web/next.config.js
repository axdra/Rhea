/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withTM = require("next-transpile-modules")(["ui","kronox-adapter"]);

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

module.exports = withTM(nextConfig)
