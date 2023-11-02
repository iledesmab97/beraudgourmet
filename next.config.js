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
      }
    ]
  },
  // allowImportingTsExtensions: true,
};

module.exports = nextConfig;
