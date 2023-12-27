const fs = require('fs');
const path = require('path');
const CONFIG_FILE = path.join(__dirname, '../../config.json');

const config = fs.existsSync(CONFIG_FILE)
  ? JSON.parse(fs.readFileSync('../../config.json', 'utf8'))
  : {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_TITLE: config?.title ?? 'ChatGPT Admin Web',
    NEXT_PUBLIC_DESCRIPTION:
      config?.description ?? 'Your personal ChatGPT Bot.',
  },
  transpilePackages: ['shared'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  rewrites: () => {
    return [
      {
        source: '/api/:slug*',
        destination: `${
          config?.backend?.url ?? 'http://localhost:3001'
        }/api/:slug*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mp.weixin.qq.com',
      },
    ],
  },
};

module.exports = nextConfig;
