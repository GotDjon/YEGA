import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Photos/vidéos de rapports terrain et documents peuvent dépasser 1 Mo (défaut Next.js).
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
