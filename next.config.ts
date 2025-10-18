import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
  },
  images: {
    remotePatterns: [new URL('https://image.tmdb.org/t/p/**')],
  },
};

export default nextConfig;
