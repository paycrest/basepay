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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "async_hooks": false,
      };
    }
    // Add platform configuration
    config.resolve = {
      ...config.resolve,
      platform: isServer ? 'node' : 'browser'
    };
    return config;
  },
};

export default nextConfig;