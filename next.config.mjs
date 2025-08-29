/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true
    }
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline',
  },
})(nextConfig);
