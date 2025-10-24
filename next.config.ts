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
  distDir: 'out'
};

export default nextConfig;
