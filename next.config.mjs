import { withGluestackUI } from '@gluestack/ui-next-adapter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default withGluestackUI(nextConfig);
