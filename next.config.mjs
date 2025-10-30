import { withGluestackUI } from '@gluestack/ui-next-adapter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@gluestack-ui/themed', 'lucide-react'],
  },
};

export default withGluestackUI(nextConfig);
