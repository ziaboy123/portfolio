import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    // hard cap on resized-image cache (the default is half the free disk); every allowed variant fits well under this
    maximumDiskCacheSize: 500_000_000,
  },
  async redirects() {
    // the project was renamed Arc -> Umbros on 2026-10-09; keep old links working
    return [{ source: "/projects/arc", destination: "/projects/umbros", permanent: true }];
  },
};

export default nextConfig;
