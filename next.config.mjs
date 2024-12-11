/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  serverRuntimeConfig: {
    runtime: process.env.RUNTIME
  },
};

export default nextConfig;
