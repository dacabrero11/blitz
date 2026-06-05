import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['gsap', 'three'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
