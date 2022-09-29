/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  newNextLinkBehavior: true
}

module.exports = {
  i18n,
  ...nextConfig,
}
