import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    '/api/**': ['./node_modules/mysql2/**/*'],
  },
  async redirects() {
    return [
      {
        source: '/_next/image',
        has: [{ type: 'query', key: 'url', value: '(?<url>.*)' }],
        destination: ':url',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/((?!_next/static|_next/image|images|uploads|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
