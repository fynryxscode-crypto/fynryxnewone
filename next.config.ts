import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' }, // devicons for tech logos
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days for optimized images
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@hello-pangea/dnd',
      'recharts',
      '@supabase/supabase-js'
    ],
    reactCompiler: true, // Enable React Compiler for automatic memoization
    // ppr: true, // Enable Partial Prerendering (Next.js 15 canary)
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true, // Enable — catches real bugs, no production overhead

  // HTTP headers for caching & security
  async headers() {
    return [
      {
        source: '/space.mp4',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2|woff))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
