const fs = require('fs');
const yaml = require('js-yaml');

const config = yaml.load(fs.readFileSync('../../config.yaml', 'utf8'));
const BASE_URL = config?.url?.backend ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_TITLE: config?.site?.title ?? 'ChatGPT Admin Web',
    NEXT_PUBLIC_BASE_URL: BASE_URL,
  },
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
        destination: `${BASE_URL}/api/:slug*`,
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
