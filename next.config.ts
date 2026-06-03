import { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  webpack: config => {
    const alias = (config.resolve?.alias ?? {}) as Record<string, string>
    alias['@'] = path.resolve(__dirname)
    config.resolve = { ...(config.resolve || {}), alias }
    return config
  },
  turbopack: {},
  experimental: {
    webpackMemoryOptimizations: true,
    preloadEntriesOnStart: false,
  },
}

export default nextConfig
