/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    localPatterns: [
      { pathname: "/public/**" }
    ],
    remotePatterns: []
  },
  experimental: {}
}
module.exports = nextConfig
