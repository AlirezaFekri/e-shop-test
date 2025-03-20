import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
