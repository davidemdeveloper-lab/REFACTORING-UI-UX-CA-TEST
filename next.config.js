const { withGluestackUI } = require('@gluestack/ui-next-adapter');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
};

module.exports = withGluestackUI(nextConfig);
