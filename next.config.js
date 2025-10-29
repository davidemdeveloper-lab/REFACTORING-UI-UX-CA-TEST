/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  webpack: (config, { dev }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web'
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions
    ];

    // Define __DEV__ for React Native
    const webpack = require('webpack');
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(dev)
      })
    );

    return config;
  }
};

module.exports = nextConfig;
