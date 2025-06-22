import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://salt.tikicdn.com/**')],
  },
};

export default nextConfig;
