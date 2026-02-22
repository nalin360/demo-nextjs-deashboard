import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure we only watch the project directory
  webpack: (config, { isServer }) => {
    if (config.watchOptions) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/node_modules/**', '**/.next/**'],
      };
    }
    return config;
  },
};

export default nextConfig;
