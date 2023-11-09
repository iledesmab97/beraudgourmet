/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'us.123rf.com'
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com'
      },
      {
        protocol: 'https',
        hostname: 'pizzeriacherokee.es'
      },
      {
        protocol: 'https',
        hostname: 'ilpappardelle.files.wordpress.com'
      },
      {
        protocol: 'https',
        hostname: 'cicciopizza.ro'
      },
    ]
  },
  // allowImportingTsExtensions: true,
};

module.exports = nextConfig;
