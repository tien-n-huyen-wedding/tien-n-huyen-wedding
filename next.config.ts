import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // For root domain deployment, remove basePath and assetPrefix
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/tien-n-huyen-wedding' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/tien-n-huyen-wedding' : '',
  distDir: 'out'
};

export default nextConfig;
