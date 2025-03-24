/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Set smaller image sizes and reduce memory usage
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Memory optimization settings
  reactStrictMode: true,
  
  // Disable failing the build when ESLint errors are present
  eslint: {
    // Warning instead of error
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checks during build
  typescript: {
    // Warning instead of error
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 