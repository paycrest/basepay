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
  webpack: (config) => {
    config.target = 'node';
    config.resolve.fallback = {
      ...config.resolve.fallback,
      async_hooks: false, 
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['async_hooks']
  },
};

export default nextConfig;
