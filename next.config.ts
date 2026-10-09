import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    // the project was renamed Arc -> Umbros on 2026-10-09; keep old links working
    return [{ source: "/projects/arc", destination: "/projects/umbros", permanent: true }];
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
