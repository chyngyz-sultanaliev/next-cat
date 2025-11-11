import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons.veryicon.com",
      },
    ],
  },
};

export default nextConfig;
