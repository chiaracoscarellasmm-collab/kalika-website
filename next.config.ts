import type { NextConfig } from "next";

/**
 * One day, with a month of stale-while-revalidate. Long enough that photos are
 * not re-validated on every page transition, short enough that replacing a file
 * without renaming it still reaches returning visitors within a day.
 */
const MEDIA_CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 90, 92],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      {
        source: "/:path*.:ext(jpg|jpeg|png|webp|avif|svg|ico|JPG)",
        headers: [{ key: "Cache-Control", value: MEDIA_CACHE_CONTROL }],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/it",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
