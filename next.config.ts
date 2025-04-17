import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    unoptimized: false,
  },
};

export default nextConfig;
