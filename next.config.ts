import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // disabled for Vercel Next.js build
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
