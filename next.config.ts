import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const nextConfig: NextConfig = {
  images: {
    // Product photos / uploads: Cloudinary plus whatever host serves the API.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      ...(apiUrl ? [new URL(`${apiUrl.replace(/\/$/, "")}/**`)] : []),
    ],
  },
};

export default nextConfig;
