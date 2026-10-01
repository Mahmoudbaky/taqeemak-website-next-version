import type { NextConfig } from "next";

/**
 * Backend origin. The browser never calls it directly: `/api/v1/*` on this site is proxied there,
 * so the backend's auth cookies (fgp, refreshToken) are first-party. Mobile browsers block
 * third-party cookies, which signed users out when the API lived on another domain.
 * NEXT_PUBLIC_API_BASE_URL is still read as a fallback for existing deployments.
 */
const apiOrigin = (process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!apiOrigin) return [];
    return [{ source: "/api/v1/:path*", destination: `${apiOrigin}/api/v1/:path*` }];
  },
  images: {
    // Product photos / uploads: Cloudinary plus whatever host serves the API.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      ...(apiOrigin ? [new URL(`${apiOrigin}/**`)] : []),
    ],
  },
};

export default nextConfig;
