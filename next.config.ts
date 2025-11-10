import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // For GitHub Pages root domain deployment
  assetPrefix: '',
  basePath: '',
  distDir: 'out',
  // Optimize bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Enable tree shaking and optimize imports
  experimental: {
    optimizePackageImports: [
      'react-photo-album',
      'yet-another-react-lightbox',
      'qrcode',
      'qr-code-styling'
    ],
  },
};

export default nextConfig;
