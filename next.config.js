/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',}
    ]
  },
  experimental: {
    ppr: "incremental",
    serverActions: {},
    after: true,
  },
  devIndicators: {
    position: 'bottom-right',
  }
};

module.exports = nextConfig;
